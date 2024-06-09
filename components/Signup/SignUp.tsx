import React, {useState} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text, Input} from '@ui-kitten/components';
import {Button} from 'react-native-paper';
import tw from 'twrnc';
import axios, {AxiosResponse} from 'axios';
import {ToastAndroid, TouchableOpacity, View} from 'react-native';
import config from '../../config.json';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../RootStackParamList';
import Loader from '../loader/Loader';
import {StackNavigationProp} from '@react-navigation/stack';

const client = axios.create({
  baseURL: config.baseUrl, // Inject the base URL
});

interface User {
  token: string;
  id: number;
  fullName: string;
  password: string;
  email: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  enabled: boolean;
  authorities: string[];
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}

interface SignupProps {
  navigation: NavigationProp<RootStackParamList, 'SignUp'>; // Replace RootStackParamList with your actual interface name and 'Login' with your actual screen name
}

type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

const SignUp: React.FC<SignupProps> = () => {
  // const SignupScreen = (props: {navigation: any}) => {

  const navigation = useNavigation<SignupScreenNavigationProp>();

  const toast = () => {
    ToastAndroid.show(
      'Failed to sign up. Please try again.',
      ToastAndroid.SHORT,
    );
  };

  const [name, setName] = useState('');
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      const credentials: {fullName: string; email: string; password: string} = {
        fullName: name,
        email: emailOrUsername,
        password,
      };

      const response: AxiosResponse<User> = await client.post<User>(
        '/auth/signup',
        JSON.stringify(credentials),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // const jwtToken = response.data.token;
      // await AsyncStorage.setItem('jwtToken', jwtToken);

      if (!response.data) {
        ToastAndroid.show('Some Error Occured', ToastAndroid.SHORT);
      }

      ToastAndroid.show('Signup Successfully', ToastAndroid.SHORT);
      navigation.navigate('Login');
    } catch (error: any) {
      console.error('Error logging in:', error);
      const errorDetail =
        error.response?.data?.detail || 'An error occurred during login';
      const errorDescription = error.response?.data?.description || '';
      const errorMessage = `Err: ${errorDetail} ${errorDescription}`;
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);

      // console.error('Error signing up:', error);
      // ToastAndroid.show(
      //   'Failed to sign up. Please try again.',
      //   ToastAndroid.SHORT,
      // );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Layout style={tw`flex h-full justify-center`}>
        <Layout style={tw`py-35 items-center text-left`}>
          <Text category="h1">Signup</Text>
        </Layout>
        <Layout style={tw`items-start pl-3 text-left`}>
          <Layout style={tw`items-start text-left mb-1`}>
            <Text category="h5">Fullname</Text>
            <Input
              style={tw`w-19/20 my-3`}
              keyboardType="default"
              placeholder="ashish verma"
              onChangeText={text => setName(text)}
            />
          </Layout>
          <Layout style={tw`items-start text-left mb-1`}>
            <Text category="h5">Email</Text>
            <Input
              style={tw`w-19/20 my-3`}
              placeholder="example.com"
              onChangeText={text => setEmailOrUsername(text)}
            />
          </Layout>
          <Layout style={tw`items-start text-left`}>
            <Text category="h5">Password</Text>
            <Input
              style={tw`w-19/20 my-3`}
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </Layout>
        </Layout>
        <Layout style={tw`justify-center items-center`}>
          <TouchableOpacity
            style={tw`bg-indigo-500 px-15 py-2 rounded-3 mt-5`}
            onPress={signUp}>
            <Text style={tw`text-xl text-white`}>SignUp</Text>
          </TouchableOpacity>
          <Loader visible={loading} />
          <Text style={tw`mt-4 mb-3`}>Already have account? </Text>
          <View style={tw`flex flex-row justify-around`}>
            <Button onPress={() => navigation.navigate('Login')}>Log-in</Button>
            <Button onPress={toast}>Toast</Button>
          </View>
        </Layout>
      </Layout>
    </ApplicationProvider>
  );
};

export default SignUp;
