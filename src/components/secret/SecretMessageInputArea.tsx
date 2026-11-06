import { splitSecrectMessageToSubstrings } from './CodeGenerator';
import { useState } from 'react';
import { useIntl } from 'react-intl';

type SecretMessageInputAreaProps = { setValue: (value: string[]) => void };

const SecretMessageInputArea = (props: SecretMessageInputAreaProps) => {
    const intl = useIntl();

    const { setValue } = props;
    const [error, setError] = useState<boolean>(false);
    const [originalValue, setOriginalValue] = useState<string>(
        intl.formatMessage({ id: 'initialSecretMessage' }),
    );

    const onChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (ev.target.value.length === 0) {
            setError(true);
            setValue([]);
        } else {
            setError(false);
            const subStrings = splitSecrectMessageToSubstrings(ev.target.value);
            setValue(subStrings);
        }
        setOriginalValue(ev.target.value);
    };

    return (
        <div>
            <textarea
                value={originalValue}
                onChange={onChange}
                className={
                    (error ? 'border-[red]' : 'border-[#888]') +
                    ' mx-[1vh] w-[90%] resize-none overflow-y-auto border font-sans text-[2.5vh] break-words hyphens-none uppercase outline-none'
                }
                rows={3}
                maxLength={60}
            />
        </div>
    );
};

export default SecretMessageInputArea;
