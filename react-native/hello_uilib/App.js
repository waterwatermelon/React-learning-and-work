/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  ScrollView,
} from 'react-native';
import {
  Text, View, Button, Card, Colors, Carousel,
  Constants,
  ProgressBar,
  Checkbox, ColorPicker, ColorPalette, DateTimePicker, Picker, SectionsWheelPicker, SegmentedControl,
  Switch,
} from 'react-native-ui-lib';
import icon from './app/assets/device.png';
import img from './app/assets/empty-state.jpg';
const list = ['hello', 'world'];
const colors = [
  '#20303C', '#43515C', '#66737C', '#858F96', '#A3ABB0', '#C2C7CB', '#E0E3E5', '#F2F4F5',
  '#3182C8', '#4196E0', '#459FED', '#57a8ef', '#8fc5f4', '#b5d9f8', '#daecfb', '#ecf5fd',
  '#00AAAF', '#32BABC', '#3CC7C5', '#64D4D2', '#8BDFDD', '#B1E9E9', '#D8F4F4', '#EBF9F9',
  '#00A65F', '#32B76C', '#65C888', '#84D3A0', '#A3DEB8', '#C1E9CF', '#E8F7EF', '#F3FBF7',
  '#E2902B', '#FAA030', '#FAAD4D', '#FBBD71', '#FCCE94', '#FDDEB8', '#FEEFDB', '#FEF7ED',
  '#D9644A', '#E66A4E', '#F27052', '#F37E63', '#F7A997', '#FAC6BA', '#FCE2DC', '#FEF0ED',
  '#CF262F', '#EE2C38', '#F2564D', '#F57871', '#F79A94', '#FABBB8', '#FCDDDB', '#FEEEED',
  '#8B1079', '#A0138E', '#B13DAC', '#C164BD', '#D08BCD', '#E0B1DE', '#EFD8EE', '#F7EBF7'
];

// 加载自定义颜色，可以通过颜色类Colors和颜色修饰器属性来访问
// 全局通用？
Colors.loadColors({
  orangeNew: '#e00', // 补充新颜色
});
console.log('Colors.isDark(Colors.grey10)', Colors.isDark(Colors.grey10));
console.log('Colors.isDark(Colors.grey80)', Colors.isDark(Colors.grey80));

const App = () => {


  return (
    <ScrollView>
      <Text>UILIB</Text>
      <View margin-10>
        <Button
          enableShadow
          label='button'
        />
        <Button label='button' borderRadius={0} />
        <Button label='disabled' disabled />
        <Button
          enableShadow
          label='label'
          iconSource={icon}
        />
      </View>

      <View margin-10 >
        <Card
          enableShadow
        >
          <Card.Section
            content={[
              { text: 'User:xxxx', text70: true, grey10: true },
              {
                text: 'content: xxxxxxxxxxxxxxxxxx',
                text80: true,
                grey10: true
              },
              { text: 'time: 22/01/28', text90: true, grey50: true }
            ]}
            style={{ padding: 20, flex: 1 }}
          />
          <Card.Section imageSource={img} />

          <Card.Section
            backgroundColor={Colors.orange60}
            content={[
              { text: 'User:xxxx', text70: true, grey10: true },
              {
                text: 'content: xxxxxxxxxxxxxxxxxx',
                text80: true,
                grey10: true
              },
              { text: 'time: 22/01/28', text90: true, grey50: true }
            ]}
            style={{ padding: 20, flex: 1 }}
          />
        </Card>
      </View>
      <View margin-10>
        <Card selected height={80} padding-10>
          <Text text30>selected</Text>
        </Card>
      </View>
      <Carousel
        pageWidth={Constants.windowWidth - 10}
        pageControlPosition={'under'}
        showCounter
      >

        {
          list.map(item => (
            <View key={item} backgroundColor={Colors.blue70}>
              <Text text50>{item}</Text>
            </View>
          ))
        }
      </Carousel>
      <View padding-10 margin-10>
        <ProgressBar progress={20} />
        {/* divider */}
        <ProgressBar progress={40} progressColor={Colors.orange60} />
      </View>
      <View padding-10 margin-10>
        <Text orangeNew>orangeNew</Text>
        <Text color={Colors.orangeNew}>orangeNew</Text>
        <Text color={Colors.orange20}>orange20</Text>
        <Text color={Colors.orange60}>orange60</Text>
        <Text text10>text10</Text>
        <Text text60>text60</Text>
        <Text text60 text60BL>text60BL</Text>
      </View>
      <View padding-10 margin-10>
        <Card>
          <Text text20> form </Text>
          <Checkbox label='label' />
          <Checkbox label='label' disabled />
          <Checkbox label='label' value={true} />
          <Checkbox label='label' value={true} disabled />
          <Checkbox label='label' value={true} iconColor={Colors.red20} />
          <Checkbox label='label' value={true} iconColor={Colors.red20} disabled />
          <Checkbox label='label' value={true} color={Colors.orange20} />
          <Switch value={true} />
          <Switch value={false} />
        </Card>
      </View>
      <View padding-12>
        <ColorPalette colors={colors} value={colors[2]} />
        <ColorPicker colors={[colors[0]]} initialColor={colors[0]} />
      </View>
      {/* 点击的时候会报错
      <DateTimePicker
        mode='date'
        ref={picker => this.picker = picker}
        value={new Date('2015-03-25T12:00:00-06:30')}
        headerStyle={{ backgroundColor: Colors.purple20 }}
        containerStyle={{ backgroundColor: Colors.red20 }}
      />
       */}
      <Picker
        value={{ label: 'aa' }}
        placeholder='picker'
        renderPicker={({ label }) => {
          return <Text>select: {label} </Text>
        }}
      >
        <Picker.Item value='a' key='a' label='aa' />
        <Picker.Item value='b' key='b' />
      </Picker>
      {/* <SegmentedControl segments={[{ label: '1 section' }, { label: '2 section' }, { label: '3 section' }]} /> */}
      {/* <SectionsWheelPicker sections={[{ items: [{ label: 'a', value: 'a' }, { label: 'ba', value: 'ba' }] }]} /> */}
    </ScrollView>
  );
};


export default App;
