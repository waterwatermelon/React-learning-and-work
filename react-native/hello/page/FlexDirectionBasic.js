import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

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
  return (<PreviewLayout >
    <Inner />
  </PreviewLayout>);
}

function PreviewLayout(props) {
  const { children, } = props;
  const options = ['row', 'column', 'row-reverse', 'column-reverse'];
  const [selectedValue, setSelectedValue] = useState(options[0]);
  return (
    <View style={{
      padding: 10,
      borderColor: 'black',
      borderWidth: 2,
    }} >
      <View style={{
        flex: 1,
        flexDirection: 'row',
      }}>

        {
          options.map(option => (
            <Text
              style={[{
                width: '24%',
                padding: 4,
                justifyContent: 'center',
                marginRight: '1%',
                backgroundColor: 'white',
                color: 'orange',
                borderRadius: 4,
                borderColor: 'orange',
                borderWidth: 1,
              },
              option === selectedValue ? {
                color: 'white',
                backgroundColor: 'orange'
              } : null]}
              onPress={() => setSelectedValue(option)}
            >
              {option}
            </Text>
          ))
        }
      </View>
      <View
        style={[{
          flex: 1,
          padding: 10,
          height: 200,
          borderColor: 'steelblue',
          borderWidth: 2,
        }, {
          flexDirection: selectedValue
        }]}>
        {children}
      </View>
    </View>);
}
