
import React from 'react';
import { ScrollView } from 'react-native';
import RNEChartsPage from './pages/RNEChartsPage';
import WubaEcharts from './pages/WubaEcharts';

function App() {

  return <ScrollView style={{ display: 'flex' }} >
    <RNEChartsPage />
    <WubaEcharts />
  </ScrollView>;
}

export default App;
