import React, {useState} from 'react';

const PrintContainer = (props: {title: string, component: any}) => {
    return (<div style={{height: '100%', width: '100%', display: "flex", flexDirection: 'column'}}>
        {props.title}
        {props.component}

    </div>)
};

export default PrintContainer;
