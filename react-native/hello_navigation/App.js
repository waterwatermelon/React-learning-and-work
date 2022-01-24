import React, { useEffect } from 'react';
import { View, Text, Button, Image, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function LoginPage(props) {
  const { navigation } = props;
  const handleLogin = () => {
    navigation.push('Home');
  }

  const handleUpdate = () => {
    navigation.setOptions({
      title: 'updated!'
    })
  }

  const gotoNesting = () => {
    navigation.push('Out');
  }

  return (
    <View>
      <Text>
        login
      </Text>
      <Button title='login' onPress={handleLogin} />
      <Button title='update option' onPress={handleUpdate} />
      <Button title='go to nesting navigation' onPress={gotoNesting} />
    </View>
  )
}

function Homepage(props) {
  const { navigation } = props;
  const gotoUser = () => {
    navigation.push('User', { name: 'sue' });
  }
  return (
    <View>
      <Text>home</Text>
      <Button title={'go to user'} onPress={gotoUser} />
    </View>)
}
// 自定义header内的title组件
function HomeTitle(props) {
  const { children } = props;
  return <View style={{ width: '100%', height: 30, backgroundColor: 'rgba(255,10,102,0.1)' }}>
    <ImageBackground style={{ width: '100%', height: '100%' }} source={require('./assets/header.jpeg')}>
      <Text style={{ color: '#f00' }}> {children}</Text>
    </ImageBackground>
  </View>
}

function UserPage(props) {
  const { route, navigation } = props;
  const { name = '' } = route.params || {};


  const handleReload = () => {
    navigation.push('User', {
      name: ''
    });
  }

  const handleSetParam = () => {
    navigation.setParams({
      name: 'name1'
    })
  }

  useEffect(() => {
    // 当前页面被激活
    navigation.addListener('focus', () => {
      console.log('[User] [focus]');
    })
    // 当前页面失活
    navigation.addListener('blur', () => {
      console.log('[User] [blur]');
    })
  }, [navigation]);
  return <View>

    <Text>user: {name}</Text>
    <Button title='go to user again' onPress={handleReload} />
    <Button title='set param' onPress={handleSetParam} />
    <Button title="Go back" onPress={() => navigation.goBack()} />
  </View>
}
function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}
function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Setting')}
      />
    </View>
  );
}
function OutPage() {
  const Tab = createBottomTabNavigator();

  return <View style={{ borderWidth: 2, borderColor: 'blue', padding: 4 }}>
    <Text
      style={{
        fontSize: 18,
        fontWeight: 'bold'
      }}>
      out
    </Text>
    <View style={{
      borderWidth: 2,
      borderColor: 'blue',
      padding: 4,
      backgroundColor: 'skyblue',
      minHeight: 600
    }}>
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'lightblue'
      }}>
        <Tab.Screen name='Profile'
          component={ProfileScreen}
          options={{ tabBarBadge: 6 }} />
        <Tab.Screen name='Setting'
          component={SettingsScreen} />
      </Tab.Navigator>
    </View>
  </View>
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      {/* Rest of your app code */}
      <Stack.Navigator
        // screenOptions 设置每个screen的公共配置
        screenOptions={{
          contentStyle: {
            backgroundColor: '#def'
          }
        }}>
        {/* Screen 定义路由与所需渲染的组件 */}
        <Stack.Screen name='Login' component={LoginPage} options={{ title: '登录' }} />
        <Stack.Screen name='Home' component={Homepage} options={{
          headerTitle: (props) => <HomeTitle {...props} />,
          headerRight: () => <Button title='right' onPress={() => alert('click right button')} />
        }} />
        <Stack.Screen name='User' component={UserPage}
          options={({ route }) => ({ title: 'title:' + route.params.name })} />
        {/* 嵌套导航 */}
        <Stack.Screen name='Out' component={OutPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}