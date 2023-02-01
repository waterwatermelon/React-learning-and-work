import React from 'react'

export default function Button(props) {
    const { children } = props;
    return (
        <button style={{ background:'#faa'}}>
            {children}
        </button>
    )
}
