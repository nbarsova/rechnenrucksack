import React, {useEffect, useState} from 'react';
import {NumberComplexity} from "../complexity/NumberComplexity";
import {EquationsAmount} from "../complexity/EquationsAmount";
import {OperationsSelector} from "../complexity/OperationsSelector";
import "./TreasureHunt.css";
import {createCanvas} from "./createCanvasUtil";
import {Operation} from "../../util/Operation";
import {createPathToCurrentTarget, initTargets} from "./MapGenerator";
import {createEquationSet} from "../../util/arithmetic";
import {FormattedMessage, useIntl} from 'react-intl';
import {StepEquation} from "./StepEquation";
import ReactPDF, {Page, Text, Image, View, Document, StyleSheet, PDFDownloadLink} from '@react-pdf/renderer';
import PrintPage from "./PrintPage";

export function TreasureHunt() {
    const numberRanges = [10, 25];
    const equationsAmounts = [6, 8, 10];
    const allOps = [Operation.ADD, Operation.SUB, Operation.MULT, Operation.DIV];

    let [numberRange, setNumberRange] = useState(numberRanges[0]);
    let [equationsAmount, setEquationsAmount] = useState(equationsAmounts[0]);
    let [selectedOps, setSelectedOps] = useState([Operation.ADD, Operation.SUB]);
    const intl = useIntl();
    const translations = {
        steps: intl.formatMessage({id: 'steps'}),
        dirUp: intl.formatMessage({id: 'dirUp'}),
        dirDown: intl.formatMessage({id: 'dirDown'}),
        dirLeft: intl.formatMessage({id: 'dirLeft'}),
        dirRight: intl.formatMessage({id: 'dirRight'}),
        title: intl.formatMessage({id: "worksheetTitle"}),
        description: intl.formatMessage({id: "worksheetDesc"}),
    }

    let solutionCanvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    const [dataURI, setDataURI] = useState(null);

    useEffect(() => {
        // console.log(numberRange, equationsAmount, selectedOps);
        const fieldSize = (numberRange === 10) ? 5 : 10;

        const targets = initTargets(fieldSize);
        const currentTarget = targets[Math.floor((Math.random() * 10) / 3)];
        let options = {};
        if ((selectedOps.length === 1) && (selectedOps[0] === "*")) {
            options = {noPrimes: true}
        }

        const steps = createPathToCurrentTarget(numberRange,
            equationsAmount, fieldSize, currentTarget, options);
        const absSteps = [];
        for (let i=0; i<steps.length; i++)
        {
            absSteps.push(Math.abs(steps[i]));
        }
        const equations = createEquationSet(absSteps, selectedOps, numberRange);
        let equationSteps: Array<StepEquation> = [];

        for (let ii=0; ii<steps.length; ii++) {
            equationSteps.push({
                equation: equations[ii],
                step: steps[ii]
            });
        }
        console.log(currentTarget, equationSteps);
        createCanvas(context, canvasWidth, canvasHeight, numberRange, targets, equationSteps, translations);
        setDataURI(solutionCanvas.toDataURL());
    }, [numberRange, equationsAmount, selectedOps]);

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    // const orientation = viewportWidth > viewportHeight ? 'landscape' : 'portrait';

    const canvasDivWidth = viewportWidth - 300; // magic nums from css
    const canvasDivHeight = viewportHeight - 220;

    const canvasHeight = Math.min(canvasDivHeight, canvasDivWidth / 2);
    const canvasWidth = canvasHeight * 2;

    const setCanvasRef = (el: HTMLCanvasElement) => {
        if (el) {
            solutionCanvas = el;
            context = el.getContext("2d");
            // createCanvas(context, canvasWidth, canvasHeight, numberRange);
        } else {
            solutionCanvas = null;
        }
    }

    const [printPageReady, setPrintPageReady] = useState(false);

    return (<div className="main">
        <div className="settings">
            <NumberComplexity numberRanges={numberRanges}
                              onRangeChange={(range: number) => setNumberRange(range)}/>

            <EquationsAmount equationsAmounts={equationsAmounts}
                             onChange={(amount: number) => setEquationsAmount(amount)}/>
            <OperationsSelector allOps={allOps}
                                onOpsChanged={(selectedOps: Array<Operation>) => {
                                    setSelectedOps(selectedOps)
                                }}/>
        </div>
        <div className="canvasWrapper">
            <canvas ref={setCanvasRef} width={canvasWidth} height={canvasHeight}/>
        </div>
        {dataURI && <PDFDownloadLink document={<PrintPage dataURI={dataURI}/>} fileName="treasure.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>}
    </div>);
}
