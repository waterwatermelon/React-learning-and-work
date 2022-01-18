import React from 'react';
import {SectionList, Text} from 'react-native';

export default function MySectionList() {
  return (
    <SectionList
      style={{
        backgroundColor: 'skyblue',
      }}
      sections={[
        {
          title: 'A',
          data: ['apple'],
        },
        {
          title: 'B',
          data: ['boy', 'black'],
        },
        {
          title: 'C',
          data: ['card', 'cartoon'],
        },
      ]}
      renderItem={({item}) => <Text>{item}</Text>}
      renderSectionHeader={({section}) => (
        <Text style={{fontSize: 18, fontWeight: 'bold'}}> {section.title}</Text>
      )}
    />
  );
}
