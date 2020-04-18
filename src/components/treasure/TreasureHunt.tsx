import React, {useEffect, useState} from 'react';
import {NumberComplexity} from "../complexity/NumberComplexity";
import {EquationsAmount} from "../complexity/EquationsAmount";
import {OperationsSelector} from "../complexity/OperationsSelector";
import "./TreasureHunt.css";
import {createCanvas} from "./createCanvasUtil";

export function TreasureHunt() {
    const numberRanges = [10, 25];
    const equationsAmounts = [6, 8, 10];
    const allOps = ["+", "-", "*", ":"];

    let [numberRange, setNumberRange] = useState(numberRanges[0]);
    let [equationsAmount, setEquationsAmount] = useState(equationsAmounts[0]);
    let [selectedOps, setSelectedOps] = useState(["+", "-"]);

    let solutionCanvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;

    useEffect(() => {
        console.log(numberRange, equationsAmount, selectedOps);
        createCanvas(context, canvasWidth, canvasHeight, numberRange);
    });

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const orientation = viewportWidth > viewportHeight ? 'landscape' : 'portrait';

    const canvasDivWidth = viewportWidth - 300;
    const canvasDivHeight = viewportHeight - 220;

    const canvasHeight = Math.min(canvasDivHeight, canvasDivWidth/2);
    const canvasWidth = canvasHeight*2;

    function setCanvasRef(el: HTMLCanvasElement) {
        if (el) {
            solutionCanvas = el;
            context = el.getContext("2d");
            createCanvas(context, canvasWidth, canvasHeight, numberRange);
        } else {
            solutionCanvas = null;
        }
    }

    return (<div className="main">
        <div className="settings">
            <NumberComplexity numberRanges={numberRanges}
                              onRangeChange={(range: number) => setNumberRange(range)}/>

            <EquationsAmount equationsAmounts={equationsAmounts}
                             onChange={(amount: number) => setEquationsAmount(amount)}/>
            <OperationsSelector allOps={allOps}
                                initialOps={["+", "-"]}
                                onOpsChanged={(selectedOps) => {
                                    setSelectedOps(selectedOps)
                                }}/>
        </div>
        <div className="canvasWrapper">
            <canvas ref={setCanvasRef} width={canvasWidth} height={canvasHeight}/>
        </div>
    </div>);
}
