import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import ShareExtension from 'react-native-share-extension';

function Share() {
    async function getData() {
        const { type, value } = await ShareExtension.data();
        console.log('value', value);
    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <View >

            <Text>
                share_to.share
            </Text>

        </View>
    );
}

export default Share;