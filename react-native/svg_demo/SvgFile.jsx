import React from 'react';
import { View } from 'react-native';
import logo from './logo.svg';
import { SvgXml } from 'react-native-svg';
import Header from './component/Header';
import Card from './component/Card';

function SvgFile() {
    return (
        <View>
            <Header title='from file' />
            <Card >
                <SvgXml xml={logo} width={200} height={200} color={'salmon'}/>
            </Card>
        </View>
    );
}

export default SvgFile;