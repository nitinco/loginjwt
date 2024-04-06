import React, { useState } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Input } from '@ui-kitten/components';
import { Button } from 'react-native-paper';
import styles from './styles';
import tw from 'twrnc'
import axios from 'axios'



const SignupScreen = (props:{navigation:any}) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id , setId] = useState('');


  const signUp = async () => {
    try {
      const response = await axios.post('https://8792-2409-4085-215-d4a4-c434-2d85-ec80-d5fb.ngrok-free.app/users', {
        id,
        username,
        email,
        password,
      });
      
      const jwtToken = response.data.token;

      props.navigation.replace('HomeScreen');
    } catch (error) {
      console.error('Error signing up:', error);
      console.warn('Error', 'Failed to sign up. Please try again.');
    }
  };



  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={styles.Contianer}>
        <Layout style={styles.h1}>
          <Text category='h1'>Signup</Text>
        </Layout>
        <Layout style={styles.layout}>
          <Layout style={styles.layout2}>
            <Text category='h5' >Fullname</Text>
            <Input
              style={styles.input}
              keyboardType='default'
              placeholder='ashish verma'
              onChangeText={text => setUsername(text)}
            />
            <Text category='h5'>Email</Text>
            <Input
              style={styles.input}
              placeholder='example.com'
              onChangeText={text => setEmail(text)}
            />
            <Text category='h5'>Password</Text>
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
            <Text style={tw`text-xl  text-white`}>SignUp</Text></Button>
          <Text style={tw`mt-5`}>Already have account?  </Text>
          <Button onPress={props.navigation.navigate('Login')}>Log-in</Button>
        </Layout>


      </Layout>
    </ApplicationProvider>
  );
}


export default SignupScreen;