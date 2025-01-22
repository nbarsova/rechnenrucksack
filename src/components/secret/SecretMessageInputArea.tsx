import './SecretMessage.css';
import {checkSecretMessage} from "./CodeGenerator";
import {useState} from "react";
import {useIntl} from "react-intl";

type SecretMessageInputAreaProps = { setValue: (value: string []) => void }

const SecretMessageInputArea = (props: SecretMessageInputAreaProps) => {
    const intl = useIntl();

    const {setValue} = props;
    const [error, setError] = useState<boolean>(false);
    const [originalValue, setOriginalValue] = useState<string>(intl.formatMessage({id: 'initialSecretMessage'}));

    const onChange = (ev) => {
        console.log('length', ev.target.value.length, ev.target.value)
        if (ev.target.value.length === 0) {
            console.log('wtf')
            setError(true);
            setValue([]);
        } else {
            setError(false);
            const subStrings = checkSecretMessage(ev.target.value);
            setValue(subStrings);
        }
        setOriginalValue(ev.target.value);
    }

    return (
        <div>
            <textarea
                value={originalValue}
                onChange={onChange}
                className={error ? "errorMessageTextArea" : "secretMessageTextArea"}
                rows={3}
                maxLength={60}/>
        </div>
    );
};

export default SecretMessageInputArea;
