import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Ping from 'react-native-ping';

function PingTest() {
  const [ip, setIp] = useState('');
  const [resultList, setResultList] = useState([]);

  // 单次测量
  const pingTest = async () => {

    try {
      /**
       *
       * Get RTT (Round-trip delay time)
       *
       * @static
       * @param {string} ipAddress - For example : 8.8.8.8
       * @param {Object} option - Some optional operations
       * @param {number} option.timeout - timeout
       * @returns
       * @memberof Ping
       */
      console.log('ip', ip);
      const ms = await Ping.start(ip || '8.8.8.8', { timeout: 1000 });
      console.log('rtt: ', ms);
    } catch (error) {
      console.log('[error] special code', error.code, error.message);
    }
    const {
      receivedNetworkSpeed,
      sendNetworkSpeed,
      receivedNetworkTotal,
      sendNetworkTotal
    } = await Ping.getTrafficStats();
    console.log('receivedNetworkSpeed:', receivedNetworkSpeed);
  };

  // 多次测量
  const pingTestMultipart = async () => {
    console.log('ip', ip);

    const N = 10;
    for (let i = 0; i < N; i++) {
      let result = '';
      try {
        const ms = await Ping.start(ip || '8.8.8.8', { timeout: 1000 });
        console.log('[%d] rtt: ', i + 1, ms);
        result = `[] rtt: ${ms}ms`;
      } catch (error) {
        console.log('[%d][error] special code', i + 1, error.code, error.message);
      }
    }

  }


  return (
    <View >
      <View style={styles.box}>
        <Text>IP地址</Text>
        <TextInput
          // style={styles.input}
          placeholder='请输入IP地址'
          value={ip}
          onChangeText={setIp} />
      </View>
      <View style={styles.box}>
        <Button title='ping' onPress={pingTest} />
        <Button title='ping(multip)' onPress={pingTestMultipart} />
      </View>
      <View style={styles.box}>
        <Text> result </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    padding: 12,
    margin: 12,
    borderWidth: 1,
    borderColor: 'skyblue',
  },
  input: {
    // borderWidth: 1,
    // borderColor: 'skyblue',
  }
})
export default PingTest;