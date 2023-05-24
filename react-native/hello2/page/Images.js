import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import img from '../image/background.png';
export default function Images() {
    const styles = StyleSheet.create({
        small: {
            width: 60,
            height: 60,
        },
        middle: {
            width: 120,
            height: 120,
        },
        big: {
            width: 240,
            height: 240,
        },
    })
    return (
        <View>
            <Image style={styles.small}  source={img}/>
            <Image style={styles.middle}  source={img}/>
            <Image style={styles.big} source={img} />
            <ImageBackground style={{ width:'100%', height:200}}source={img}   >
                <Text>ImageBackground</Text>
            </ImageBackground>
        </View>

    )                                                                                                                                                                       
}                                                                                                                                   
