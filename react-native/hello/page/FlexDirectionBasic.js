import React from 'react';
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
  return (<View
    style={[{
      flex: 1,
      padding: 10,
      borderColor: 'black',
      borderWidth: 2,
    }, {
      // flexDirection: 'row',
    }]}>
    {children}
  </View>);
}
