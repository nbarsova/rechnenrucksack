import React, {useEffect, useState} from 'react';
import {NumberComplexity} from "../complexity/NumberComplexity";
import {EquationsAmount} from "../complexity/EquationsAmount";
import {OperationsSelector} from "../complexity/OperationsSelector";
import "./TreasureHunt.css";

export function TreasureHunt() {
    const numberRanges = [10, 25];
    const equationsAmounts = [6, 8, 10];
    const allOps = ["+", "-", "*", ":"];

    let [numberRange, setNumberRange] = useState(numberRanges[0]);
    let [equationsAmount, setEquationsAmount] = useState(equationsAmounts[0]);
    let [selectedOps, setSelectedOps] = useState(["+", "-"]);

    useEffect(() => {
        console.log(numberRange, equationsAmount, selectedOps);
    });

    let solutionCanvas: HTMLCanvasElement, context: CanvasRenderingContext2D, borderImage: HTMLImageElement;


    function setCanvasRef(el: HTMLCanvasElement) {
        solutionCanvas = el;
        context = el.getContext("2d");

    }

    function setImageRef(el: HTMLImageElement) {
        borderImage = el;
        context.drawImage(borderImage, 50, 50);
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
        <div className="solutionCanvas">
            <canvas ref={setCanvasRef}/>
            <img src="../../img/map-border-horizontal.png" ref={setImageRef} className="hidden"/>
        </div>
    </div>);
}
