import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Input } from '@ui-kitten/components';
import { Button } from 'react-native-paper';
import styles from './styles';
import tw from 'twrnc'

const Signup = (props:{navigation:any}) => {


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
            />
            <Text category='h5'>Email</Text>
            <Input
              style={styles.input}
              placeholder='example.com'
            />
            <Text category='h5'>Password</Text>
            <Input
              style={styles.input}
              placeholder='password'
            />
          
          </Layout>

        </Layout>
        <Layout style={styles.layout3}>
          <Button style={[styles.logButton]}>
            <Text style={tw`text-xl  text-white`}>SignUp</Text></Button>
          <Text style={tw`mt-5`}>Already have account?  </Text>
          <Button onPress={() => props.navigation.navigate("Login")}>Log-in</Button>
        </Layout>


      </Layout>
    </ApplicationProvider>
  );
}


export default Signup;