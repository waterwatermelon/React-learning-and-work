import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';

export default function MyTextInput() {
  const [text, setText] = useState('');
  return (
    <View
      style={{
        margin: 10,
        height: 60,
      }}>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: 'skyblue',
        }}
        placeholder={'type  here'}
        onChangeText={text => setText(text)}
      />
      <Text>{text}</Text>
    </View>
  );
}
