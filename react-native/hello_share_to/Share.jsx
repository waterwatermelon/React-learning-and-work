import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import ShareExtension from 'react-native-share-extension';

function Share() {
    const [result, setResult] = useState('-');
    const [uri, setUri] = useState('');
    async function getData() {
        const { type, value } = await ShareExtension.data();
        console.log('type', type);
        console.log('value', value);
        setResult([`type: ${type}`, `value:${value}`].join('\n'));

        if (type && type.includes('image')) {
            setUri(value);
        }
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <View >

            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                share_to.receiver （singleTask ）
            </Text>
            <View>
                <Text>
                    result:
                </Text>
                <Text>
                    {result}
                </Text>
            </View>

            <View style={{ backgroundColor: 'rgba(255,255,0,0.1)',  }}>
                <Image
                    style={{
                        width: 200, height: 200,
                        margin: 10,
                        borderWidth: 2, borderColor: 'red',
                    }}

                    // width={200}
                    // height={200}

                    // source={{ uri: 'file:///storage/emulated/0/DCIM/Camera/IMG_20230417_234201.jpg' }} 
                    source={{ uri }}
                />
            </View>
        </View>
    );
}

export default Share;