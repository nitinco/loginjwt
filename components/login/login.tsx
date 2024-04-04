import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Input} from '@ui-kitten/components';
import { Button } from 'react-native-paper';
import styles from './styles';
import tw from 'twrnc'


const Login = (props:{navigation:any}) => {
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
              style={styles.input}
              placeholder='password'
            />
          </Layout>

        </Layout>
        <Layout style={styles.layout3}>
          <Button onPress={() => props.navigation.navigate("Signup")} style={[styles.logButton]}>
            <Text style={tw`text-xl  text-white`}>Login</Text></Button>
          <Text style={tw`mt-5`}>Did not you have account?</Text>
          {/* <TouchableOpacity onPress={()=>props.navigation.navigate("Signup")}>Signup</TouchableOpacity> */}
          <Button  onPress={()=>props.navigation.navigate("Signup")}>SignUp</Button>
        </Layout>


      </Layout>
    </ApplicationProvider>
  );
}


export default Login;