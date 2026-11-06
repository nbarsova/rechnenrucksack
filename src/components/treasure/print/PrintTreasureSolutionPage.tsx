import PrintEquation from './PrintEquation';
import { FormattedMessage, useIntl } from 'react-intl';
import { Direction, MapCoordinate } from '../types';
import { Equation } from '../../../types';

const PrintTreasureSolutionPage = (props: {
    equations: Equation[];
    currentTarget: MapCoordinate;
    directions: Direction[];
}) => {
    const { equations, directions, currentTarget } = props;
    const intl = useIntl();

    const renderEquation = (equation: Equation, index: number) => {
        return (
            <PrintEquation
                equation={equation}
                index={index}
                showAnswers={true}
                direction={directions[index]}
            />
        );
    };

    let location;

    if (currentTarget.x > 0 && currentTarget.y > 0) {
        location = intl.formatMessage({ id: 'upperRight' });
    }

    if (currentTarget.x > 0 && currentTarget.y < 0) {
        location = intl.formatMessage({ id: 'lowerRight' });
    }

    if (currentTarget.x < 0 && currentTarget.y > 0) {
        location = intl.formatMessage({ id: 'upperLeft' });
    }

    if (currentTarget.x < 0 && currentTarget.y < 0) {
        location = intl.formatMessage({ id: 'lowerLeft' });
    }

    return (
        <div>
            {equations.map(renderEquation)}
            <div className="mt-[20px]">
                <span className="mr-[5px]">
                    <FormattedMessage id="answer" />
                </span>
                <span className="mr-[5px]">
                    {intl.formatMessage({ id: 'treasureLocation' })}
                </span>
                <span className="mr-[5px]">{location}</span>
            </div>
        </div>
    );
};

export default PrintTreasureSolutionPage;
