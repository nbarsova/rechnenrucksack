import React from 'react';
import {Direction} from "../classes/Direction";
import {StepEquation} from "../../../util/classes/StepEquation";
import {useIntl} from "react-intl";

const PrintEquation = (props: {
    equationStep: StepEquation,
    index: number,
    showAnswer?: boolean
}) => {
    const intl = useIntl();
    let axis = "";

    const getDirection = (number: number, direction: string) => {

        switch (direction) {
            case Direction.VERTICAL:
                if (Math.sign(number) === 1) {
                    return intl.formatMessage({id: 'dirUp'});
                } else {
                    return intl.formatMessage({id: 'dirDown'});
                }
                break;
            case Direction.HORIZONTAL:
                if (Math.sign(number) === 1) {
                    return intl.formatMessage({id: 'dirRight'})
                } else
                    return intl.formatMessage({id: 'dirLeft'});
        }
    }

    if (props.index % 2 == 0) {
        axis = Direction.HORIZONTAL;
    } else {
        axis = Direction.VERTICAL;
    }

    const result = props.showAnswer ? Math.abs(props.equationStep.step) : "__";
    const stepStr =
        intl.formatMessage({id: 'steps'},
            {count: props.showAnswer ? Math.abs(props.equationStep.step) : 100}) + ' ';

    return (<div className='printEquation'
                key={props.index}>
        <span className='equationText'>{(props.index + 1) + '). '}</span>
        <span className='equationText'>{props.equationStep.equation.number1}</span>
        <span className='equationText'>{props.equationStep.equation.operation + ' '}</span>
        <span className='equationText'>{props.equationStep.equation.number2 + " = "}</span>
        <span className={props.showAnswer ? 'equationAnswerText': 'equationText'}>{result}</span>
        <span className='equationText'>{stepStr}</span>
        <span className='equationText'>{getDirection(props.equationStep.step, axis)}</span></div>);
};

export default PrintEquation;
