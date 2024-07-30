import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // saving error
    }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem('key');
      if (value !== null) {
        return value;
        // value previously stored
      }
    } catch (error) {
      // handle rejection
      console.log(error)
      // error reading value
    }
  };

  export default{
    storeData,
    getData
  }