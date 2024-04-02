// App.js

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  HomeScreen from './components/login/HomeScreen';
import DetailsScreen from './components/login/DetailScreen';
import login from './components/login/login';

const Stack = createStackNavigator();
const getApiData=async()=>{
  const Url="http://192.0.2.2:3000/users";
  let result= await fetch(Url)
  result=await result.json();
  console.warn(result);
}
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="login" component={login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
