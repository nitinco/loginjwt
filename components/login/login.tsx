
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Input } from '@ui-kitten/components';
import { Button } from 'react-native-paper';
import styles from './styles';
import tw from 'twrnc'
import axios from 'axios'
import { useEffect, useState } from 'react';
import AsyncStorage from 'react-native'

const getData = async () => {
  Url: 'https://1c64-2409-4085-191-3a2e-84d6-25c5-2bc2-1894.ngrok-free.app/users'
  let result = await fetch('Url')
  result = await result.json();
  console.warn(result);
}



const Login = (props: { navigation: any }) => {
  // console.log(props)


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
            />
            <Text category='h5'>Password</Text>
            <Input
              secureTextEntry
              style={styles.input}
              placeholder='password'
            />
          </Layout>

        </Layout>
        <Layout style={styles.layout3}>
          <Button onPress={() => props.navigation.navigate("Home")} style={[styles.logButton]}>
            <Text style={tw`text-xl  text-white`}>Login</Text></Button>
          <Text style={tw`mt-5`}>Did not you have account?</Text>
          <Button onPress={() => props.navigation.navigate("SignUp")}>SignUp</Button>
          <Button onPress={() => props.navigation.navigate("Test")}>Test</Button>
        </Layout>


      </Layout>
    </ApplicationProvider>
  );
}


export default Login;