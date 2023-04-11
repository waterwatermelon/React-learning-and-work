import React, { useEffect, useState } from 'react';
import { Alert, Animated, Text, View } from 'react-native';
import Header from '../component/Header';
import { RNCamera } from 'react-native-camera';
import { useInterval } from 'ahooks';

function ScanPage() {
  const [lineY, setLineY] = useState(0);
  const [frame, setFrame] = useState(0);
  const Y_MIN = 0;
  const Y_MAX = 200;

  useInterval(() => {
    let lineYTemp = lineY;
    if (lineYTemp === Y_MAX) {
      lineYTemp = Y_MIN;
    } else {
      lineYTemp++;
    }
    setLineY(lineYTemp);
  }, frame ? 1000 / frame : null);
  useEffect(() => {

  }, []);
  return (
    <View>
      <Header title='camera_capacity' />
      <Text >scan page</Text>
      {/* 呈现摄像头捕捉到的内容 */}
      <RNCamera
        // 读取到二维码
        onBarCodeRead={result => {
          console.log('result:', result);
          Alert.alert('read code');
        }}>
        {/* 自定义内部展示元素 */}
        <View style={{
          width: Y_MAX,
          height: Y_MAX,
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderColor: 'white',
          borderWidth: 1,
        }}>
          {/* 扫描线动画 */}
          <Animated.View style={[{
            height: 1,
            backgroundColor: '#46AEFF',
            elevation: 1,
          }, {
            transform: [{
              translateY: lineY,
            }]
          }]}>

          </Animated.View>
        </View>


        <Text style={{ color: 'white', fontSize: 16, }}>扫描二维码</Text>
      </RNCamera>
    </View>
  )
}

export default ScanPage;