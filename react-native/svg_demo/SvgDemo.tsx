import React, { useState } from 'react';
import Header from './component/Header';
import Card from './component/Card';
import { Circle, Defs, LinearGradient, Path, RadialGradient, Rect, Stop, Svg, } from 'react-native-svg';
import { GestureResponderEvent } from 'react-native/types';
import { Text } from 'react-native';

function SvgDemo() {
    const circle_r = 40;

    const [cx, setCx] = useState(20);
    const [cy, setCy] = useState(20);

    const handlePressSvgBox = (e: GestureResponderEvent) => {
        console.log('[press] [svg]')
        console.log('e:', e);
        const { locationX, locationY } = e.nativeEvent;
        console.log('x', locationX);
        setCx(locationX);
        setCy(locationY);
    };


    return (
        <>
            <Header title='elements' />
            <Card>
                <Svg height={160}>
                    <Circle cx={20} cy={20} r={16} fill={'skyblue'} />
                    <Rect x={10} y={40} width={100} height={80} fill={'skyblue'} />
                    <Path d='M160,20 L160,20 L360,20 Z'
                        stroke={'skyblue'}
                        strokeWidth={6}
                        strokeDasharray={[2, 4, 8]}
                    />

                </Svg>
            </Card>
            <Header title='gradient' />

            <Card >
                <Svg height={200}>
                    <Defs >
                        <LinearGradient id='lg1' x1={'0'} y1={'0%'} x2={'100%'} y2={'0%'}>
                            <Stop offset={'0%'} stopColor={'pink'} />
                            <Stop offset={'100%'} stopColor={'salmon'} />
                        </LinearGradient>
                        <LinearGradient id='lg2' x1={0} y1={0} x2={1} y2={0}>
                            <Stop offset={0} stopColor={'skyblue'} />
                            <Stop offset={0.91} stopColor={'salmon'} />
                        </LinearGradient>
                        <RadialGradient id='rg1' cx={'50%'} cy={'50%'} r={'50%'} >
                            <Stop offset={0} stopColor={'skyblue'} />
                            <Stop offset={1} stopColor={'#EEF3FE'} />
                        </RadialGradient>
                        <RadialGradient id='rg2' cx={'50%'} cy={'50%'} r={'50%'} >
                            <Stop offset={0} stopColor={'white'} />
                            <Stop offset={1} stopColor={'#EEF3FE'} />
                        </RadialGradient>
                    </Defs>
                    <Rect x={10} y={110} width={200} height={80} fill={'url(#lg1)'} />
                    <Rect x={10} y={10} width={200} height={80} fill={'url(#lg2)'} />
                    <Circle cx={200 + 10 + 12 + circle_r} cy={10 + circle_r} r={circle_r} fill={'url(#rg1)'} />
                    <Circle cx={200 + 10 + 12 + circle_r} cy={110 + circle_r} r={circle_r} fill={'url(#rg2)'} />

                </Svg>
            </Card>
            <Header title='interaction' />
            <Card>
                <Svg height={100} onPress={handlePressSvgBox}>
                    <Circle cx={cx} cy={cy} r={16} fill={'skyblue'} />
                </Svg>
            </Card>
            <Text >点击画布，移动圆点</Text>
        </>
    );
}

export default SvgDemo;