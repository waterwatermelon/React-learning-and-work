import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';

export default function MyFetchButton() {
  const [data, setData] = useState('');
  function fetchData() {
    const url = 'http://10.10.10.208/olt/system/api/v1/info/get';
    fetch(url)
      .then(response => response.json())
      .then(content => {
        console.log('content', content);
        setData(JSON.stringify(content));
      })

  }
  return <View style={{ margin: 12,padding:12, backgroundColor: 'salmon'}}  >
    <Button title='fetch' onPress={fetchData} />
    <View>
      <Text style={{ fontSize: 18 }}>{data}</Text>
    </View>
  </View>
}
