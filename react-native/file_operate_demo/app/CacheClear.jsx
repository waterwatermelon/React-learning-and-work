import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import { Button, Image, Text, View } from 'react-native';
import * as CacheManager from '@yz1311/react-native-http-cache';
import { styles } from './style';

function CacheClear() {
  const [size, setSize] = useState(0);

  const getSize = async () => {
    const cacheSize = await CacheManager.getCacheSize();
    setSize(cacheSize);
  }
  const clear = () => {
    CacheManager.clearCache();
  }
  useEffect(() => {
    getSize();
  }, []);
  return (
    <>

      <Header title='CacheClear' />
      <View style={styles.box}>
        <Button title='get size' onPress={getSize} />
        <Button title='clear' onPress={clear} />
        <Image style={{ width: 80, height: 80 }} source={{
          uri: 'http://upload1.testspeed.cdn16.com:8080/speedtest/random3000x3000.jpg',
        }} />
        <Text >size:{size}</Text>
      </View>
    </>
  );
}

export default CacheClear;