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
  ActionBar,
  Drawer,
  ExpandableSection,
  Stepper,
  Dialog,
  Incubator,
} from 'react-native-ui-lib';
import icon from './app/assets/device.png';
import img from './app/assets/empty-state.jpg';
import ToastsScreen from './app/components/ToastScreen';


const { TextField } = Incubator;
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

Colors.loadColors({
  orangeNew: '#e00', // 补充新颜色
});
console.log('Colors.isDark(Colors.grey10)', Colors.isDark(Colors.grey10));
console.log('Colors.isDark(Colors.grey80)', Colors.isDark(Colors.grey80));

function Buttons() {
  return (<View margin-10>
    <Button
      enableShadow
      label='button'
    />
    <Button
      enableShadow
      outline
      outlineColor={Colors.orange10}
      label='button-outline'
    />
    <Button round style={{ width: 100, height: 100 }} />
    <Button round outline style={{ width: 100, height: 100 }} />
    <Button label='button-border-radius-0' borderRadius={0} />
    <Button label='button-disabled' disabled />
    <Button
      enableShadow
      label='button-icon'
      iconSource={icon}
    />
  </View>
  );
}

function Texts() {
  return (
    <View padding-10 margin-10>
      <Text orangeNew>text-orangeNew</Text>
      <Text color={Colors.orangeNew}>text-orangeNew</Text>
      <Text color={Colors.orange20}>text-orange20</Text>
      <Text color={Colors.orange60}>text-orange60</Text>
      <Text text10>text10</Text>
      <Text text60>text60</Text>
      <Text text60 text60BL>text60BL</Text>
    </View>
  );
}

function ExpandedSections() {
  const [expanded, setExpanded] = useState(false);
  return (
    <View margin-10 >
      <ExpandableSection
        expanded={expanded}
        sectionHeader={
          <View bg-purple60>
            <Text text40BO>header(ExpandableSection)     {expanded ? '△' : '▽'}</Text>
          </View>
        }
        onPress={() => setExpanded(!expanded)}

      >
        <Text>expandable section</Text>
      </ExpandableSection>
    </View>);
}

function StepperScreen() {

  const [stepperValue, setStepperValue] = useState(1);
  const stepperProps = {
    minValue: 0,
    maxValue: 3,
    value: 1
  };

  function onValueChange(value) {
    setStepperValue(value);
  };

  return (
    <View padding-10 margin-10>
      <Card>

        <Text text40 marginB-20>Stepper</Text>

        <View centerV>
          <View row spread centerV>
            <Text text70>Default</Text>
            <Stepper />
          </View>

          <View row spread centerV marginT-30>
            <Text text70>Disabled</Text>
            <Stepper disabled />
          </View>

          <View row spread marginT-30>
            <Text text70>Step (0.5)</Text>
            <Stepper step={0.5} />
          </View>

          <View row spread marginT-30>
            <Text text70>Small</Text>
            <Stepper small />
          </View>

          <View marginT-30>
            <View row spread centerV>
              <Text text70>Custom</Text>
              <Stepper
                onValueChange={onValueChange}
                maxValue={stepperProps.maxValue}
                minValue={stepperProps.minValue}
                value={stepperValue}
                testID={'Stepper1'}
              />
            </View>
            <View padding-5>
              <Text text80M>Stepper value: {stepperValue}</Text>
              <Text marginT-3>Initial value: {stepperProps.value}</Text>
              <Text marginT-3>Min value: {stepperProps.minValue}</Text>
              <Text marginT-3>Max value: {stepperProps.maxValue}</Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
}

function Dialogs() {
  const [visible, setVisible] = useState(false);
  const renderContent = () => {
    return (
      <View bg-white br10 padding-10>
        <View >
          <Text text60>header</Text>
        </View>
        <Text > dialog </Text>
        <View >
          <Button label='cancel' onPress={() => { setVisible(false) }} />
        </View>
      </View>
    )
  };
  return (
    <View>
      <Button label='show dialog' onPress={() => setVisible(true)} />
      <Dialog visible={visible}>
        {renderContent()}
      </Dialog>
    </View>
  )
}
const App = () => {


  return (
    <ScrollView>
      <Text>UILIB</Text>
      <Buttons />
      <Texts />
      <View >
        <ActionBar
          centered
          backgroundColor={Colors.purple60}
          actions={[{
            label: 'one', onPress: () => { },
          }, {
            label: 'two', onPress: () => { },
          },]} />
      </View>
      <View>
        {/* 左右滑动，未见具体变化，需要在手机上再试试 */}
        <Drawer

          fullRightThreshold={0.3}
          fullLeftThreshold={0.3}
          onFullSwipeLeft={(e) => console.log('e', e)}
          onFullSwipeRight={(e) => console.log('e', e)}
          rightItems={[{
            text: 'delete',
            background: Colors.red20,
          }]}>
          <View>
            <Text>drawer</Text>
          </View>
        </Drawer>
      </View>
      <ExpandedSections />
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
        <Card>
          <Text text40> form </Text>
          <View row marginT-10>
            <Checkbox label='label' />
            <Checkbox label='label-' disabled />
            <Checkbox label='label' value={true} />
            <Checkbox label='label' value={true} disabled />
            <Checkbox label='label' value={true} iconColor={Colors.red20} />
            <Checkbox label='label' value={true} iconColor={Colors.red20} disabled />
            <Checkbox label='label' value={true} color={Colors.orange20} />
          </View>
          <View row marginT-10>
            <Switch value={true} />
            <Switch value={false} />
          </View>
          <View>
            <TextField label='text-field' placeholder='please input' hint='hint' />
            <TextField label='text-field' placeholder='please input' hint='hint' value='123456' showCharCounter />
          </View>
        </Card>
      </View>
      <StepperScreen />
      <View padding-12>
        <ColorPalette colors={colors} value={colors[2]} />
        <ColorPicker colors={[colors[0]]} initialColor={colors[0]} />
      </View>
      {/* 点击的时候会报错
      <DateTimePicker
        mode='date'
        ref={picker => picker = picker}
        value={new Date('2015-03-25T12:00:00-06:30')}
        headerStyle={{ backgroundColor: Colors.purple20 }}
        containerStyle={{ backgroundColor: Colors.red20 }}
      />
       */}
      <View bg-purple60>
        <Picker
          value={{ label: 'aa' }}
          placeholder='picker'
          renderPicker={({ label }) => {
            return <Text>select: {label} </Text>
          }}
        >
          <Picker.Item value='a' key='a' label='aa' />
          <Picker.Item value='b' key='b' label='bb' />
          <Picker.Item value='c' key='c' label='cc' />
        </Picker>
      </View>
      <Dialogs />
      <ToastsScreen />
      {/* <SegmentedControl segments={[{ label: '1 section' }, { label: '2 section' }, { label: '3 section' }]} /> */}
      {/* <SectionsWheelPicker sections={[{ items: [{ label: 'a', value: 'a' }, { label: 'ba', value: 'ba' }] }]} /> */}
    </ScrollView>
  );
};


export default App;
