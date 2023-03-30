import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Ping from 'react-native-ping';
import Header from '../component/Header';

function PingTest() {
  const [ip, setIp] = useState('');
  const [resultList, setResultList] = useState([]);

  // 单次测量
  const pingTest = async () => {
    setResultList([]);

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
      setResultList([`rtt:${ms}`]);
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
    setResultList([]);
    console.log('ip', ip);

    const N = 10;
    const list = [];
    for (let i = 0; i < N; i++) {
      let message = '';
      const seq = (i + 1).toString().padStart(2, '0');
      let ms = 0;
      try {
        ms = await Ping.start(ip || '8.8.8.8', { timeout: 1000 });
        console.log('[%d] rtt: ', seq, ms);
        message = `[${seq}] rtt: ${ms}ms`;
      } catch (error) {
        console.log('[%d][error] special code', seq, error.code, error.message);
        message = `[${seq}] error: ${error.code} , ${error.message}`;
      }
      list.push({ message, data: ms });
    }
    const validData = list.filter(e => e.data);
    const aver = validData.reduce((pre, item) => { return pre + item.data / validData.length }, 0);
    list.push({
      message: `aver: ${aver.toFixed(3)}ms`
    })
    setResultList(list.map(e => e.message));

  }


  return (
    <View >
      <Header title='Ping Test' />
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
        {
          resultList.map(result => {
            return <View>
              <Text> {result}</Text>
            </View>
          })
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    borderWidth: 1,
  },

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
});
export default PingTest;