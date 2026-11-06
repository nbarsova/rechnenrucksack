import { useIntl } from 'react-intl';
import { Equation } from '../../../types';
import { Direction } from '../types';

const PrintEquation = (props: {
    equation: Equation;
    direction: Direction;
    showAnswers: boolean;
    index: number;
}) => {
    const intl = useIntl();

    const { equation, direction, showAnswers, index } = props;

    const result = showAnswers ? Math.abs(equation.result) : '__';

    const stepStr =
        intl.formatMessage(
            { id: 'steps' },
            { count: showAnswers ? Math.abs(equation.result) : 100 },
        ) + ' ';

    return (
        <div
            className="my-[4px] flex flex-row flex-nowrap"
            key={equation.result}
        >
            <span className="mr-[5px]">{index + 1 + '). '}</span>
            <span className="mr-[5px]">{equation.number1}</span>
            <span className="mr-[5px]">{equation.operation + ' '}</span>
            <span className="mr-[5px]">{equation.number2 + ' = '}</span>
            <span
                className={
                    showAnswers ? 'font-answer mr-[5px] underline' : 'mr-[5px]'
                }
            >
                {result}
            </span>
            <span className="mr-[5px]">{stepStr}</span>
            <span className="mr-[5px]">
                {intl.formatMessage({ id: direction })}
            </span>
        </div>
    );
};

export default PrintEquation;
