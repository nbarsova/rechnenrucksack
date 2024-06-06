// @ts-ignore
import monster from '../../img/monsterP.png';

const MonsterPrintPage = () => {


    return (
        <div style={{display: 'flex', flexDirection: 'row'}} id='mainCell'>
            <div style={{display: 'flex', flexDirection: 'column'}} id='leftEquation'>
                <div style={{height: '30px', width: '30px', border: '1px solid black'}}></div>
                <div style={{height: '30px', width: '30px', border: '1px solid black'}}></div>
                <div style={{height: '30px', width: '30px', border: '1px solid black'}}></div>
                <div style={{height: '30px', width: '30px', border: '1px solid black'}}></div>
                <div style={{height: '30px', width: '30px', border: '1px solid black'}}></div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}} id='middle'>
                <div style={{ display: 'flex', flexDirection: 'row'}} id='middleEquationTop'>
                    <div style={{height: '30px', width: '30px', border: '1px solid black'}}></div>
                    <div style={{height: '30px', width: '30px', border: '1px solid black'}}></div>
                    <div style={{height: '30px', width: '30px', border: '1px solid black'}}></div>
                </div>
                <div style={{ height: '95px', width: '90px'}} id='monsterPic'>
                    <img  style={{ height: '95px', width: '90px'}} src={monster} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row'}} id='middleEquationBottom'>
                    <div style={{height: '30px', width: '30px', border: '1px solid black'}}></div>
                    <div style={{height: '30px', width: '30px', border: '1px solid black'}}></div>
                    <div style={{height: '30px', width: '30px', border: '1px solid black'}}></div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column'}} id='rightEquation'>
                <div style={{height: '30px', width: '30px', border: '1px solid black'}}></div>
                <div style={{height: '30px', width: '30px', border: '1px solid black'}}></div>
                <div style={{height: '30px', width: '30px', border: '1px solid black'}}></div>
                <div style={{height: '30px', width: '30px', border: '1px solid black'}}></div>
                <div style={{height: '30px', width: '30px', border: '1px solid black'}}></div>
            </div>
        </div>
    );
};

export default MonsterPrintPage;