

import React, { useRef, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

import { Form, Field } from 'simple-react-form'

class MyInput extends React.Component {


  render() {
    return (<View style={{ borderColor: 'black', borderWidth: 1, margin: 4, }}>
      <TextInput value={this.props.value} onChangeText={this.props.onChange} />
      <Text> {this.props.errorMessage}</Text>
    </View>)
  }
}

function SimpleReactForm() {
  const formRef = useRef();
  const [formData, setFormData] = useState();

  const handleSubmit = values => {
    console.log('values', values);
  };


  return (<View>

    <Form ref={formRef} state={formData} onChange={setFormData} onSubmit={handleSubmit}>
      <Field fieldName='title' label='title' type={MyInput} />
    </Form>

    <Button title='submit' onPress={() => { formRef.current.submit() }} />
  </View>
  )
}

export default SimpleReactForm