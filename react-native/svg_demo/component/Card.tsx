import React, { ReactComponentElement } from 'react';
import { View } from 'react-native';

interface CardProps {
    children?: React.ReactNode;
}
function Card(props: CardProps) {
    return (
        <View style={{
            backgroundColor: 'white',
            borderRadius: 10,
            margin: 12,
        }}>
            {
                props.children
            }
        </View>
    );
}

export default Card;