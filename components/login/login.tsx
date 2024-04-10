
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Input } from '@ui-kitten/components';
import { Button } from 'react-native-paper';
import styles from './styles';
import tw from 'twrnc'
import axios from 'axios'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';



const Login = (props: { navigation: any }) => {
  

  const signup=()=>{
    props.navigation.replace('SignUp')
  }

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const response = await axios.post('YOUR_BACKEND_LOGIN_ENDPOINT', {
        emailOrUsername,
        password,
      });

      // Assuming your backend returns a JWT token upon successful login
      const jwtToken = response.data.token;

      // Save the JWT token to AsyncStorage or other storage mechanism
      await AsyncStorage.setItem('jwtToken', jwtToken);

      // Navigate to the home screen or any other screen
      props.navigation.replace('HomeScreen');
    } catch (error) {
      console.error('Error logging in:', error);
      ToastAndroid.show('Invalid email/username or password. Please try again.',ToastAndroid.SHORT);
    }
  };




  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={styles.Contianer}>
        <Layout style={styles.h1}>
          <Text category='h1'>Login</Text>
        </Layout>
        <Layout style={styles.layout}>
          <Layout style={styles.layout2}>
            <Text category='h5' >Username or email</Text>
            <Input
              style={styles.input}
              keyboardType='email-address'
              placeholder='example.com'
              onChangeText={text => setEmailOrUsername(text)}
            />
            <Text category='h5'>Password</Text>
            <Input
              secureTextEntry
              style={styles.input}
              placeholder='password'
              onChangeText={text => setEmailOrUsername(text)}
            />
          </Layout>

        </Layout>
        <Layout style={styles.layout3}>
          <Button onPress={login} style={[styles.logButton]}>
            <Text style={tw`text-xl  text-white`}>Login</Text></Button>
          <Text style={tw`mt-5`}>Did not you have account?</Text>
          <Button onPress={signup}>SignUp</Button>
          <Button onPress={() => props.navigation.replace("Test")}>Test</Button>
        </Layout>


      </Layout>
    </ApplicationProvider>
  );
}


export default Login;