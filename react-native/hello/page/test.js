import React from 'react';
import { Button } from 'react-native';
import { setData } from '../store/myStore';

export default function test() {
  const testStorage = () => {
    setData('user','sue');
  }
  return <Button onPress={testStorage} title='test'/>
}
