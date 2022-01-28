import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Text, Linking } from 'react-native';

const Drawer = createDrawerNavigator();
function Home() {
  return <Text>Home</Text>
}

function User() {
  return <Text>User</Text>
}
function drawerContent(props) {
  console.log('props', props);
  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      <DrawerItem
        label='help'
        // 使用浏览器打开网页
        onPress={() => { Linking.openURL('https://www.baidu.com') }} />
    </DrawerContentScrollView>
  )
}
function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName='User'
      screenOptions={{ 
        // headerShown: false 
      }}
      drawerContent={drawerContent}
    >
      <Drawer.Screen key='Home' name="Home" component={Home} />
      <Drawer.Screen name="User" component={User} />
    </Drawer.Navigator>
  );
}
export default function App() {
  return (

    <NavigationContainer>
      {/* Rest of your app code */}
      <MyDrawer />
    </NavigationContainer>
  );
}