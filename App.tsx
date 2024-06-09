import 'react-native-gesture-handler';
import React from 'react';
// import {Provider, useDispatch, useSelector} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './components/SplashScreen/SplashScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './RootStackParamList';
// import {selectToken} from './components/store/auth/authSlice';
import {store} from './components/store/store';
import Home from './components/Home/Home';
import Test from './components/Test/Test';
import DetailsScreen from './components/login/DetailScreen';
import Login from './components/login/login';
import Logout from './components/logout/logout';
import SignUp from './components/Signup/SignUp';
import {Provider} from 'react-redux';

const RootStack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  // const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Login">
          <RootStack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Home',
              headerShown: false,
            }}
          />
          <RootStack.Screen name="Details" component={DetailsScreen} />
          <RootStack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="Logout"
            component={Logout}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="Test"
            component={Test}
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
