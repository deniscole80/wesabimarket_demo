import AsyncStorage from '@react-native-async-storage/async-storage';

const frontStorage = {
    asyncStore: async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value)
        } catch (e) {
          // saving error
          console.log(e);
        }
    },

    asyncGet: async (key) => {
        try {
          const value = await AsyncStorage.getItem(key)
          if(value !== null) {
            return value;
          }
        } catch(e) {
          // error reading value
          console.log(e);
        }
    },

    asyncRemove: async (key) => {
      try {
        await AsyncStorage.removeItem(key)
      }catch(e){
        console.log(e);
      }
    }
}

export default frontStorage;