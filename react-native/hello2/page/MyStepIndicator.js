import React from 'react';
import {View} from 'react-native';
import StepIndicator from 'react-native-step-indicator';

export default function MyStepIndicator() {
  return (
    <View
      style={{
        height: 440,
        backgroundColor: 'lightpink',
      }}>
      <StepIndicator
        direction={'vertical'}
        stepCount={4}
        currentPosition={2}
        labels={['a', 'b', 'c', 'd']}
      />
    </View>
  );
}
