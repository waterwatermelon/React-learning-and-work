import React, { createContext, useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Switch as RNSwitch } from 'react-native';
import { useFormr } from 'react-formr';
import { Picker as UILibPicker } from 'react-native-ui-lib';

const styles = StyleSheet.create({
  label: {
    marginHorizontal: 12,
  },
  fieldRow: {
    lineHeight: 36,
    marginHorizontal: 12,
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  message: {
    color: 'red',
    marginHorizontal: 12,
  }
});
// TODO: Form
// TODO: validate

const Switch = ({ value, onChange, }) => {
  return <RNSwitch value={value} onChange={() => { onChange(!value) }} />;
};

const Picker = ({ value, onChange, options = [], placerHolder = '请选择' }) => {
  const getLabel = () => {
    if (value) {
      const item = options.find(e => e.value === value);
      return item.label;
    }
  };
  return (<UILibPicker
    value={value}
    onChange={onChange}
    renderPicker={(value) => {
      return <Text style={{ lineHeight: 30 }}> {getLabel() || placerHolder} </Text>
    }}>
    {
      options.map(option => <UILibPicker.Item  key={option.value}  value={option.value}label={option.label} />)
    }
  </UILibPicker>);
};

const FormItem = ({
  label,
  name,
  event = 'onChangeText',
  type: Type,
  formItemProps,
}) => {
  const formContext = useContext(FormContext);
  const { valid, values, onChangeHandler } = formContext;
  const nodeProps = {
    value: values[name],
    // onChange, onValueChange...
    onChange: e => {
      onChangeHandler(name, e)
    },
    [event]: e => {
      onChangeHandler(name, e);
    },
    ...formItemProps
  };
  return <View>
    <View style={styles.label}>
      <Text >{label}</Text>
    </View>
    <View style={styles.fieldRow}>
      <Type
        style={styles.fieldRow}
        {...nodeProps} />
    </View>
    <Text style={[styles.message ,{ display: !valid[name] ? 'flex' : 'none' }]}>error</Text>
  </View>
};
const FormContext = createContext({
  data: [],
});
function ReactFormrHook() {
  const {
    values,
    valid,
    inputBinder,
    refsHandler,
    onChangeHandler,
    onSubmitHandler
  } = useFormr({
    // 初始值？
    formFields: {
      email: '',
      phone: '',
      enable: false,
    },
    // 校验规则
    validation: {
      email: {
        // type: 'email', 
      },
      phone: {
        // required: true,
      },
      // 不填，则跳过字段校验
      input2: {},
      picker: {},
    }
  });
  return (<>
    <View>
      <FormContext.Provider value={{ valid, values, onChangeHandler }}>

        <Text> email</Text>
        <TextInput
          style={styles.fieldRow}
          // 读取form中的value
          value={values.email}
          // 向form写入修改的值
          onChangeText={e => onChangeHandler('email', e)}
          // 注册ref，用于字段校验？
          ref={ref => refsHandler('email', ref)} />
        <Text style={{ display: !valid.email ? 'flex' : 'none', color: 'red' }}> invalid</Text>

        <Text> phone</Text>
        <TextInput
          style={styles.fieldRow}
          // 简写，直接生成value,onChangeText,ref等
          {...inputBinder('phone')}
        />

        <Text> enable</Text>
        <Switch
          value={values.enable}
          onChange={e => onChangeHandler('enable', e)} />

        <FormItem label={'input2'} name='input2' type={TextInput} />
        <FormItem label={'picker'} name='picker' type={Picker}
          formItemProps={{
            options: [{ label: 'NO.1', value: '1' },
            { label: 'No.2', value: '2' }]
          }} />
      </FormContext.Provider>

      <Button title='submit' onPress={() => onSubmitHandler(console.log)} />
    </View>
  </>);
}

export default ReactFormrHook