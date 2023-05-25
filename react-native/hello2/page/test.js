import React from 'react';
import { Button } from 'react-native';
import { setData } from '../store/myStore';

export default function TestStorage() {
  const testStorage = () => {
    setData('user','sue');
  }
  return <Button onPress={testStorage} title='test'/>
}
