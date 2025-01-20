import {LetterCode} from "../../../types";

const LetterCodes = (props: { letterCodeHeight: number, letterCodes: Array<LetterCode> }) => {

    const {letterCodeHeight, letterCodes} = props;

    const renderKey = (letterCode: LetterCode) => {
        return <div key={letterCode.letter}
                    style={{marginRight: '5px', border: '1px solid green', fontSize: letterCodeHeight / 8 + 'px'}}>;
            {letterCode.code + ' = ' + letterCode.letter}
        </div>
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            height: letterCodeHeight + 'px',
            background: 'lightgreen',
            overflowY: 'auto'
        }}>
            {letterCodes.map(renderKey)}
        </div>);
};

export default LetterCodes;