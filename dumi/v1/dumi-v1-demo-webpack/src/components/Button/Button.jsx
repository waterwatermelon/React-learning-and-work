import React from 'react'

export default function Button(props) {
    const { children } = props;
    return (
        <button style={{ background:'#faa',outline:'none', padding:'12px 20px'}}>
            {children}
        </button>
    )
}
