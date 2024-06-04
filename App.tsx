// App.js

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './components/login/HomeScreen';
import DetailsScreen from './components/login/DetailScreen';
import Login from './components/login/login';
// import {View} from 'react-native';
// import SignUp from './components/Signup/SignUpScreen';
import Test from './components/Test/Test';
import SplashScreen from './components/SplashScreen/SplashScreen';
import SignupScreen from './components/Signup/SignUpScreen';

import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './RootStackParamList';
import Logout from './components/logout/logout';

const RootStack = createStackNavigator<RootStackParamList>();

// const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Login">
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen name="Details" component={DetailsScreen} />
        <RootStack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="SignUp"
          component={SignupScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Test"
          component={Test}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Logout"
          component={Logout}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
