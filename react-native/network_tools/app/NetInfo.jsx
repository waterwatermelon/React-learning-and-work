import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Header from '../component/Header';
import NetInfo from '@react-native-community/netinfo';
import { styles } from './style';

function NetInfoPage() {
  const [netInfoEvent, setNetInfoEvent] = useState({});

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log('state', state);
      state.details = JSON.stringify(state.details);
      setNetInfoEvent(state);
    });
    return () => {
      unsubscribe();
    }
  }, []);
  return (
    <View >
      <Header title='Net-Info' />
      <View style={styles.card}>
        <Text>type: {netInfoEvent.type}</Text>
        <Text>isConnected: {netInfoEvent.isConnected ? 'true': 'false'}</Text>
        <Text>isWifiEnabled (Android Only): {netInfoEvent.isWifiEnabled? 'true': 'false'}</Text>
        <Text>details: {netInfoEvent.details}</Text>
      </View>
    </View>
  )
}

export default NetInfoPage;