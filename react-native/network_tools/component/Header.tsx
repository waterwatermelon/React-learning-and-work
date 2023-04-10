import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
  title?: string;
}
function Header(props: HeaderProps) {
  const { title = '' } = props;
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: 'skyblue',
    color: 'white',
    padding: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    lineHeight: 32,
    fontWeight: 'bold',
  },
})
export default Header;