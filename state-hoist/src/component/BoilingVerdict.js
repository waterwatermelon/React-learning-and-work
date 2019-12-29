import React from 'react';
// 根据传入的celsius，来判断水是否会沸腾
export function BoilingVerdict(props){
    if (props.celsius >= 100) {
        return <p>The water would boil。。。</p>;
    } else {
        return <p>The water would not boil.</p>
    }
}