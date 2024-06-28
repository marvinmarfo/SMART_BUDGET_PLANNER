import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/(tabs)/index';
import HomeScreen from './app/index'; // Ensure this is the correct path

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} /> {/* Add this line */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
