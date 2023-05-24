import React from 'react'
import { Button, Linking, Text, View } from 'react-native'

export default function Links() {
  const openWebPage = () => {
    Linking.openURL('https://www.baidu.com');
  };
  const openWx = () => {
    Linking.openURL('weixin');
  };

  return (
    <View>
      <Button title='open web' onPress={openWebPage} />
      <Button title='open wx' onPress={openWx} />
    </View>

  );
}
