import React, {useState} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text, Input} from '@ui-kitten/components';
import {Button} from 'react-native-paper';
import styles from './styles';
import tw from 'twrnc';
import axios from 'axios';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({navigation}) => {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');

  const signUp = async () => {
    try {
      const response = await axios.post(
        'https://82c0-2409-4085-208-112-1d23-e631-4fd0-a75e.ngrok-free.app/users',
        {
          id,
          username,
          email,
          password,
        },
      );

      const jwtToken = response.data.token;
      await AsyncStorage.setItem('jwtToken', jwtToken);

      navigation.replace('Home');
      ToastAndroid.show('Signup Successfully', ToastAndroid.SHORT);
    } catch (error) {
      // console.error('Error signing up:', error);
      ToastAndroid.show(
        'Failed to sign up. Please try again.',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={styles.Contianer}>
        <Layout style={styles.h1}>
          <Text category="h1">Signup</Text>
        </Layout>
        <Layout style={styles.layout}>
          <Layout style={styles.layout2}>
            <Text category="h5">Fullname</Text>
            <Input
              style={styles.input}
              keyboardType="default"
              placeholder="ashish verma"
              onChangeText={text => setUsername(text)}
            />
            <Text category="h5">Email</Text>
            <Input
              style={styles.input}
              placeholder="example.com"
              onChangeText={text => setEmail(text)}
            />
            <Text category="h5">Password</Text>
            <Input
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </Layout>
        </Layout>
        <Layout style={styles.layout3}>
          <Button style={[styles.logButton]} onPress={signUp}>
            <Text style={tw`text-xl  text-white`}>SignUp</Text>
          </Button>
          <Text style={tw`mt-5`}>Already have account? </Text>
          <Button onPress={()=>navigation.push('Login')}>Log-in</Button>
        </Layout>
      </Layout>
    </ApplicationProvider>
  );
};

export default SignupScreen;
