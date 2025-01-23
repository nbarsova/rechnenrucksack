import {useIntl} from "react-intl";
import {Equation} from "../../../types";
import {Direction} from "../types";

const PrintEquation = (props: {
    equation: Equation,
    direction: Direction,
    showAnswers: boolean,
    index: number
}) => {
    const intl = useIntl();

    const {equation, direction, showAnswers, index} = props;

    const result = showAnswers ? Math.abs(equation.result) : "__";

    const stepStr =
        intl.formatMessage({id: 'steps'},
            {count: showAnswers ? Math.abs(equation.result) : 100}) + ' ';

    return (<div className='printEquation'
                 key={equation.result}>
        <span className='equationText'>{(index + 1) + '). '}</span>
        <span className='equationText'>{equation.number1}</span>
        <span className='equationText'>{equation.operation + ' '}</span>
        <span className='equationText'>{equation.number2 + " = "}</span>
        <span className={showAnswers ? 'equationAnswerText' : 'equationText'}>{result}</span>
        <span className='equationText'>{stepStr}</span>
        <span className='equationText'>{intl.formatMessage({id: direction})}</span></div>);
};

export default PrintEquation;
