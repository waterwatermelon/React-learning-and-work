import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export function PreviewLayout(props) {
    const { children, label, options } = props;
    const [selectedValue, setSelectedValue] = useState(options[0]);
    return (
      <View style={{
        padding: 10,
        borderColor: 'black',
        borderWidth: 2,
      }} >
        <Text
          style={{
            fontSize: 18
          }}>
          {label}
        </Text>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          margin: 6,
        }}>
  
          {
            options.map(option => (
              <Text
                style={[{
                  width: '24%',
                  padding: 4,
                  justifyContent: 'center',
                  marginRight: '1%',
                  backgroundColor: 'white',
                  color: 'orange',
                  borderRadius: 4,
                  borderColor: 'orange',
                  borderWidth: 1,
                },
                option === selectedValue ? {
                  color: 'white',
                  backgroundColor: 'orange'
                } : null]}
                onPress={() => setSelectedValue(option)}
              >
                {option}
              </Text>
            ))
          }
        </View>
        <View
          style={[{
            flex: 1,
            padding: 10,
            height: 200,
            borderColor: 'steelblue',
            borderWidth: 2,
          }, {
            [label]: selectedValue
          }]}>
          {children}
        </View>
      </View>);
  }
  