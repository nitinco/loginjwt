// App.js

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  HomeScreen from './components/login/HomeScreen';
import DetailsScreen from './components/login/DetailScreen';
import Login from './components/login/login';
import { View } from 'react-native';
import SignUp from './components/Signup/SignUpScreen';
import Test from './components/Test/Test';
import SplashScreen from './components/SplashScreen/SplashScreen';
import SignupScreen from './components/Signup/SignUpScreen';


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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignupScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Test" component={Test} options={{headerShown:true}}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;
