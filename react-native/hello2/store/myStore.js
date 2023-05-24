import AsyncStorage  from '@react-native-async-storage/async-storage';

export function setData(key,value) {
    AsyncStorage.setItem(key,value) 
}

export function getData(key) {
   return AsyncStorage.getItem(key);
}