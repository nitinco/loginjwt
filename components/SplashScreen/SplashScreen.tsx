/* eslint-disable react-native/no-inline-styles */
import {Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../RootStackParamList';
// import {Provider} from 'react-redux';
// import {StackNavigationProp} from '@react-navigation/stack';
// import {store} from '../../components/store/store';

// type SplashScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'Splash'
// >;

interface SplashProps {
  navigation: NavigationProp<RootStackParamList, 'Splash'>; // Replace RootStackParamList with your actual interface name and 'Login' with your actual screen name
}

const Splash: React.FC<SplashProps> = () => {
  // const navigation = useNavigation<SplashScreenNavigationProp>();
  // export default function SplashScreen(props: {navigation: any}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // it is for animation of the splash screen

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  //this for stop splash screen for 2 second

  useEffect(() => {
    setTimeout(() => {
      // navigation.navigate('Login');
    }, 1000);
  });

  return (
    // <Provider store={store}>
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}>
        <Layout
          style={{
            backgroundColor: 'black',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animated.Image
            source={require('../SplashScreen/rtulogo.jpeg')}
            style={{
              width: 200,
              height: 200,
              borderRadius: 50,
              transform: [{scale: fadeAnim}], // Bind scale to animated value
            }}
          />
          <Text category="h1" style={{textAlign: 'center'}}>
            welcome to Rtu clubs
          </Text>
        </Layout>
      </Animated.View>
    </ApplicationProvider>
    // </Provider>
  );
};

export default Splash;
