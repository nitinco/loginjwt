// App.js

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  HomeScreen from './components/login/HomeScreen';
import DetailsScreen from './components/login/DetailScreen';
import Login from './components/login/login';
import { View } from 'react-native';
import SignUp from './components/Signup/SignUp';
import Test from './components/Test/Test';


const Stack = createNativeStackNavigator();



// const getApiData=async()=>{
//   const Url="http://192.0.2.2:3000/users";
//   let result= await fetch(Url)
//   result=await result.json();
//   console.warn(result);
// }

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Signup" component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name="Test" component={Test} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;
