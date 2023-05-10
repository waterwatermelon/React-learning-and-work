
import React, { useCallback, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  ActionBar, Assets, Button, Card, Carousel, Checkbox, Chip, ColorPalette, ColorPicker, Constants, Dash, Dialog, Drawer,
  ExpandableSection, Fader, GridList, GridListItem, GridView, Incubator, Picker, ProgressBar, SortableList, Stepper, Switch, Text, Timeline, TouchableOpacity, View
} from 'react-native-ui-lib';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import img from './app/assets/device.png';
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
    // iconSource={icon}
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

function ListComponents() {
  const itemContainerStyle = {
    borderColor: 'grey',
    borderWidth: 1,
    margin: 2,
    borderRadius: 12,
  };


  return <View margin-12>
    <View marginB-12 bg-grey60>
      <GridList
        ListHeaderComponent={<Text>Header</Text>}
        data={['hello', 'grid', 'list', 'hihi']}
        itemSpacing={0}
        renderItem={(props) => {
          console.log('props', props);
          const { item } = props;
          return <View style={{
            borderColor: 'grey',
            borderWidth: 1,
          }}>
            <Text>{item}</Text>
          </View>;
        }}
        contentContainerStyle={{
          paddingTop: 12,
          marginBottom: 12,
        }} />
    </View>
    <View style={{ backgroundColor: '#dedede', padding: 2, }}>
      <GridView
        items={[{
          containerProps: {
            ...itemContainerStyle,
          },
          // 自定义item的渲染 
          renderCustomItem: () => {
            return (
              <View style={{ borderColor: 'black', borderWidth: 2, }}>
                <Text>render custom item</Text>
              </View>
            );
          },
        },
        {
          title: 'a',
          subtitle: (<Text style={{ fontSize: 18, }} > subtitle </Text>),
          description: 'description',
          onPress: () => {
            console.log('press item 2');
          },
          containerProps: {
            useNative: true,
            backgroundColor: 'salmon',
            ...itemContainerStyle,
          },
        },
        {
          title: 'a',
          subtitle: '-a',
          containerProps: {
            ...itemContainerStyle,
          },
        },
        {
          title: 'a',
          subtitle: '-a',
          containerProps: {
            ...itemContainerStyle,
          },
        },]}
        numColumns={3}
      />
    </View>

    <Timeline
      // 无法定义point的样式
      point={{
        type: 'outline',
        state: 'success',
        label: 'NO.1',
      }}
      bottomLine={{ type: 'dashed', color: 'grey', }}
    >
      <View style={{ backgroundColor: 'skyblue', height: 72 }}>
        <Text>a</Text>
      </View>
    </Timeline >
    <Timeline
      point={{
        state: 'current',
        label: 'NO.2',
      }}
      topLine={{ type: 'solid', color: 'red', }}
      bottomLine={{ type: 'solid', color: 'grey', }} >
      <Text
        style={{
          height: 64,
        }}>
        b
      </Text>
    </Timeline>
    <Timeline
      point={{
        state: 'error',
        label: '3',
      }}
      topLine={{ type: 'solid', color: 'red', }}
      bottomLine={{ type: 'solid', color: 'grey', }} >
      <Text>c</Text>
    </Timeline>
    <Timeline
      topLine={{ type: 'solid', color: 'red', }}
      bottomLine={{ type: 'solid', color: 'grey', }}
    />
  </View>
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
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
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
        <View margin-20 bg-white >
          {/* 左右滑动，未见具体变化，需要在手机上再试试 */}
          <Drawer
            fullSwipeRight={true}
            bounciness={12}
            rightItems={[{ text: 'Read', background: Colors.blue30, onPress: () => console.log('read pressed') }]}
            leftItem={{ text: 'Delete', background: Colors.red30, onPress: () => console.log('delete pressed') }}
          >
            <View centerV padding-s4 bg-white style={{ height: 60 }}>
              <Text text70>Item</Text>
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
        <View padding-12 bg-pink>
          <Chip label={'Chip1'} onPress={() => console.log('pressed')} />
          <Chip label={'Chip2'} onDismiss={() => console.log('pressed')} />
          <Chip label={'Chip3'} labelStyle={{ color: 'white' }} backgroundColor='blue' />
        </View>

        <StepperScreen />

        <View padding-12>
          <ColorPalette colors={colors} value={colors[2]} />
          <ColorPicker colors={[colors[0]]} initialColor={colors[0]} />
        </View>
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
        {/* List */}
        <ListComponents />
        {/* Infra */}
        <View marginV-12 padding-10>
          <ScrollView >
            <View style={{ width: 100, height: 80, marginHorizontal: 40 }}>
              <Text>content</Text>
            </View>
          </ScrollView>
          <Fader visible={true} tintColor='pink' position='bottom' />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


export default App;
