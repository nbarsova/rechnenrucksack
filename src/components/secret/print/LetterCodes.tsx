import {LetterCode} from "../../../types";

const LetterCodes = (props: { letterCodeHeight: number, letterCodeWidth: number, letterCodes: Array<LetterCode> }) => {

    const {letterCodeHeight, letterCodes, letterCodeWidth} = props;

    const renderKey = (letterCode: LetterCode) => {
        return <div key={letterCode.letter}
                    style={{marginRight: '5px', fontSize: letterCodeHeight / 8 + 'px'}}>
            {letterCode.code + ' = ' + letterCode.letter}
        </div>
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            height: letterCodeHeight + 'px',
            width: letterCodeWidth + 'px',
            overflowY: 'auto'
        }}>
            {letterCodes.map(renderKey)}
        </div>)
};

export default LetterCodes;