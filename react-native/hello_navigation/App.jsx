import React, { useEffect } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyButton from './components/MyButton';
import settingIcon from './assets/setting_u.png';
import profileIcon from './assets/profile_u.png';
const navIcons = {
  setting: settingIcon,
  profile: profileIcon,
};

function LoginPage(props) {
  const { navigation } = props;

  const handleLogin = () => {
    navigation.navigate('Home');
  }

  const handleUpdate = () => {
    navigation.setOptions({
      title: 'updated!'
    })
  }
  const gotoNesting = () => {
    navigation.navigate('Out');
  }

  const gotoNestingOfMyTabBar = () => {
    navigation.navigate('MyTabBarPage');
  }

  return (
    <View>
      <Text>
        login
      </Text>
      <MyButton title='login' onPress={handleLogin} />
      <MyButton title='update option' onPress={handleUpdate} />
      <MyButton title='nesting navigation(1)' onPress={gotoNesting} />
      <MyButton title='nesting navigation(2)' onPress={gotoNestingOfMyTabBar} />
    </View>
  )
}

function Homepage(props) {
  const { navigation } = props;
  const gotoUser = () => {
    navigation.navigate('User', { name: 'sue' });
  }
  return (
    <View>
      <Text>home</Text>
      <MyButton title={'go to user'} onPress={gotoUser} />
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
    navigation.navigate('User', {
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
    <MyButton title='go to user again' onPress={handleReload} />
    <MyButton title='set param' onPress={handleSetParam} />
    <MyButton title="Go back" onPress={() => navigation.goBack()} />
  </View>
}
// Inner Page 1 
function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}
// Inner Page 2 
function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
      <MyButton
        title="Go to Settings"
        onPress={() => navigation.navigate('Setting')}
      />
    </View>
  );
}

function TabBarIcon(props) {
  console.log('props : ', props);
  const { color, focused, size } = props;
  const { label, iconKey } = props;
  iconKey && console.log(' navIcons[iconKey] ', navIcons[iconKey]);
  return <View>
    <Image source={navIcons[iconKey]} style={{ width: size, height: size, tintColor: color }} />
  </View>;
}

function tabBarIconFactory({ label, key: iconKey }) {
  return (props) => <TabBarIcon {...props} label={label} iconKey={iconKey} />;
}

function OutPageOfNest() {
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
        tabBarInactiveTintColor: '#7E87A1',
        tabBarIcon: TabBarIcon,
      }}>
        <Tab.Screen name='Profile'
          component={ProfileScreen}
          options={{
            tabBarBadge: 6,
            tabBarIcon: tabBarIconFactory({ key: 'profile' }),
          }} />
        <Tab.Screen name='Setting'
          component={SettingsScreen}
          options={{
            tabBarIcon: tabBarIconFactory({ key: 'setting' }),
          }} />
      </Tab.Navigator>
    </View>
  </View>
}
function MyTabBar(props) {
  console.log('tarbarProps:', props);// routeNames, 
  return <View style={{
    height: 40,
    backgroundColor: 'darkblue',
  }}>

  </View>

}
function MyTabBarPage() {
  const Tab = createBottomTabNavigator();
  return <View style={{ borderWidth: 2, borderColor: 'blue', padding: 4 }}>

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
        tabBarInactiveTintColor: '#7E87A1',
        tabBarIcon: TabBarIcon,
      }}
        tabBar={MyTabBar}
      >
        <Tab.Screen name='Profile'
          component={ProfileScreen}
          options={{
            tabBarBadge: 6,
            tabBarIcon: TabBarIcon,
          }} />
        <Tab.Screen name='Setting'
          component={SettingsScreen}
          options={{
            tabBarIcon: tabBarIconFactory({ label: 'SET' }),
          }} />
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
          headerRight: () => <MyButton title='right' onPress={() => alert('click right button')} />
        }} />
        <Stack.Screen name='User' component={UserPage}
          options={({ route }) => ({ title: 'title:' + route.params.name })} />
        {/* 嵌套导航 */}
        <Stack.Screen name='Out' component={OutPageOfNest} />
        <Stack.Screen name='MyTabBarPage' component={MyTabBarPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}