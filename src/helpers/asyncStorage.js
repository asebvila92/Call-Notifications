import { AsyncStorage } from 'react-native';

export const getData = async (key) => {
  let value = null;
  try {
    value = await AsyncStorage.getItem(key)
  } catch(e) {
    console.log(e);
  }
  return value;
}

export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  }catch (e) {
    console.log(e);
  }
}

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  }catch (e) {
    console.log(e);
  }
}

export const getObject = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log(e)
  }
}

export const saveObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log(e)
  }
}