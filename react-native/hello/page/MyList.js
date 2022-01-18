import React from 'react';
import {FlatList, Text, View} from 'react-native';

export default function MyList() {
  return (
    <FlatList
      style={{
        padding: 2,
        borderColor: 'black',
        borderWidth: 1,
      }}
      data={[
        {
          name: 'susan',
        },
        {
          name: 'kavin',
        },
        {
          name: 'susan',
        },
      ]}
      renderItem={({item}) => (
        <View
          key={item.name}
          style={{
            margin: 4,
            borderColor: 'pink',
            borderWidth: 2,
            color: 'pink',
          }}>
          <Text> {item.name}</Text>
        </View>
      )}
    />
  );
}
