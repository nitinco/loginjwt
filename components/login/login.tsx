/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-catch-shadow */
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text, Input} from '@ui-kitten/components';
import {Button} from 'react-native-paper';
import tw from 'twrnc';
import axios, {AxiosResponse} from 'axios';
import {useEffect, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../RootStackParamList';
import config from '../../config.json';
import {ToastAndroid, TouchableOpacity, View} from 'react-native';
import Loader from '../loader/Loader';
import {StackNavigationProp} from '@react-navigation/stack';
import {TokenStorage, StorageType} from '../JWT/tokenStorage';
import {useDispatch} from 'react-redux';
import {setToken, selectToken} from './reducers/authSlice';
import store from '../../store';
import {updateToken} from '../store/auth/userActions';

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

  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  description: string;
}

interface LoginProps {
  navigation: NavigationProp<RootStackParamList, 'Login'>; // Replace RootStackParamList with your actual interface name and 'Login' with your actual screen name
}

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const Login: React.FC<LoginProps> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const tokenStorage = new TokenStorage(StorageType.Keychain);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      // const token = await AsyncStorage.getItem('jwtToken');
      const token = await tokenStorage.getToken();
      console.log(token);
      console.log('Token Check Success');
      if (token === null) {
        navigation.navigate('Login');
      } else {
        navigation.navigate('Home');
      }
    };
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const credentials: {email: string; password: string} = {
        email: emailOrUsername,
        password,
      };
      console.log(credentials);

      const response: AxiosResponse<User> = await client.post<User>(
        '/auth/login',
        JSON.stringify(credentials),
        {
          headers: {
            'Content-Type': 'application/json', // Set content type header
          },
        },
      );

      if (!response.data || !response.data.token) {
        console.error('Error loggin in:', error);

        const errorDetail =
          response.data.detail || 'An error occurred during login';
        const errorDescription = response.data.description || '';
        const errorMessage = `Err: ${errorDetail} ${errorDescription}`;
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT); // Exit early if no token or invalid data
      }

      const jwtToken: string = response.data.token;

      dispatch(updateToken(jwtToken));
    } catch (error: any) {
      console.error('Error logging in:', error);
      const errorDetail =
        error.response?.data?.detail || 'An error occurred during login';
      const errorDescription = error.response?.data?.description || '';
      const errorMessage = `Err: ${errorDetail} ${errorDescription}`;
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <Provider store={store}>
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Layout style={tw`flex h-full justify-center`}>
        <Layout style={tw`py-35 items-center text-left`}>
          <Text category="h1">Login</Text>
        </Layout>
        <Layout style={tw`items-start pl-3 text-left`}>
          <Layout style={tw`items-start text-left mb-5`}>
            <Text category="h5">Username or email</Text>
            <Input
              style={tw`w-19/20 my-3`}
              keyboardType="email-address"
              placeholder="example.com"
              onChangeText={text => setEmailOrUsername(text)}
            />
          </Layout>
          <Layout style={tw`items-start text-left`}>
            <Text category="h5">Password</Text>
            <Input
              secureTextEntry
              style={tw`w-19/20 my-3`}
              placeholder="password"
              onChangeText={text => setPassword(text)}
            />
          </Layout>
        </Layout>
        <Layout style={tw`justify-center items-center`}>
          <TouchableOpacity
            onPress={handleLogin}
            style={tw`bg-indigo-500 px-12 py-2 rounded-3 mt-15`}>
            <Text style={tw`text-xl text-white`}>Login</Text>
          </TouchableOpacity>
          <Loader visible={loading} />
          <Text style={tw`mt-10 mb-3`}>Did not you have account?</Text>
          <View style={tw`flex flex-row justify-around`}>
            <Button onPress={() => navigation.navigate('SignUp')}>
              SignUp
            </Button>
            <Button style={tw``} onPress={() => navigation.navigate('Home')}>
              Home
            </Button>
            <Button style={tw``} onPress={() => navigation.navigate('Logout')}>
              Logout
            </Button>
            <Button style={tw``} onPress={() => navigation.navigate('NewLog')}>
              NewLog
            </Button>
          </View>
        </Layout>
      </Layout>
    </ApplicationProvider>
    // </Provider>
  );
};

export default Login;
