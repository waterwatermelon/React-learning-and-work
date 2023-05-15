import axios from 'axios';
import React from 'react'
import { Button, Text, View } from 'react-native'
import Header from '../component/Header';
import { axiosRequest } from './axiosConfig';
import { styles } from './style';

function AxiosLogger() {
  const sendRequest = () => {
    axiosRequest.get('/olt/zhjg/api/v1/mobile/user/info/get', { params: { token: 'mytoken' } })
      .then(content => {
        console.log('success');
      });
    axiosRequest.post('/olt/zhjg/api/v1/mobile/app/upgrade/check', { platformName: 'ANDROID', appType: 'MIME' })
      .then(content => {
        console.log('success');
      });
  };
  return (
    <View>
      <Header title='axios-logger' />
      <View style={styles.card}>
        <Button title='reqeust' onPress={sendRequest} />
      </View>
    </View>
  )
}

export default AxiosLogger;