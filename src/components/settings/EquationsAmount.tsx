import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

export function EquationsAmount(props: {
    equationsAmounts: Array<number>;
    onChange: (amount: number) => void;
}) {
    const [selectedAmount, setSelectedAmount] = useState(
        props.equationsAmounts[0],
    );

    const renderAmount = (amount: number) => {
        return (
            <div
                key={amount}
                className="cursor-pointer"
                onClick={() => {
                    if (amount !== selectedAmount) {
                        setSelectedAmount(amount);
                        props.onChange(amount);
                    }
                }}
            >
                <input
                    type="radio"
                    checked={amount === selectedAmount}
                    onChange={() => {}}
                />
                {amount}
            </div>
        );
    };
    return (
        <div className="flex flex-col p-[1vh]">
            <b>
                <FormattedMessage id="equationsAmount" />
            </b>
            {props.equationsAmounts.map(renderAmount)}
        </div>
    );
}
