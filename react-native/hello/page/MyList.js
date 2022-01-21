import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 2,
    margin: 6,
    borderColor: 'black',
    borderWidth: 2,
  },
  item: {
    margin: 4,
    borderColor: 'pink',
    borderWidth: 2,
    color: 'pink',
  },
  red: {
    color: 'red',
  },
  black: {
    color: 'black',
  }
});

const emptyData = [];
const shortData = [
  {
    name: 'susan',
  },
  {
    name: 'kavin',
  },
  {
    name: 'susan',
  },
];
const data = shortData;

export default function MyList() {
  return <View style={styles.container}>
    {
      data.length
        ?
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View
              key={item.name}
              style={styles.item}>
              <Text style={[styles.red, styles.black]}> {item.name}</Text>
            </View>
          )}
        />
        : <Text> 暂无数据 </Text>

    }
  </View>
}
