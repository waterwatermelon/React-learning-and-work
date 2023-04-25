import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';

function MyButton({ title, onPress, style }) {
  const handlePress = () => {
    onPress && onPress();
  }
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ backgroundColor: '#2196f3' , height: 36, lineHeight: 36 ,marginBottom: 4, marginHorizontal: 2}}>
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 16,  lineHeight: 36}}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default MyButton;