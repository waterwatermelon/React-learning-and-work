import React, { useState, memo, useCallback } from 'react';

function PageA(props) {
    console.log('One');
    return <h3 onClick={props.onClick}>'One'</h3>;
}
function PageB(props) {
    console.log('Two')
    return <h3 onClick={props.onClick}>'Two'</h3>;

}
export default function UseCallbackComponent() {
    const [a, setA] = useState(0)
    const [b, setB] = useState(0)

    const handleClick1 = () => {
        setA(a + 1)
    }
    const handleClick2 = () => {
        setB(b + 1)
    }
    return (
        <div>
            <PageA onClick={handleClick1}>{a}</PageA>
            <PageB onClick={handleClick2} name={b} />
        </div>
    )
}
