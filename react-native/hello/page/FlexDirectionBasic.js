import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { PreviewLayout } from './layout/PreviewLayout'
const styles = StyleSheet.create({
  box: {
    width: 50,
    height: 50,
    borderColor: 'salmon',
    borderWidth: 2,
    backgroundColor: 'steelblue',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function Inner() {
  return (
    <>
      <View style={styles.box}>
        <Text>1</Text>
      </View>
      <View style={styles.box}>
        <Text>2</Text>
      </View>
      <View style={styles.box}>
        <Text>3</Text>
      </View>
    </>
  )
}
export default function FlexDirectionBasic() {
  const options = ['row', 'column', 'row-reverse', 'column-reverse'];
  return (<PreviewLayout
    label='flexDirection'
    options={options}>
    <Inner />
  </PreviewLayout>);
}

