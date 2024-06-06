/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-catch-shadow */
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text, Input} from '@ui-kitten/components';
import {Button} from 'react-native-paper';
import styles from './styles';
import tw from 'twrnc';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../RootStackParamList';
import config from '../../config.json';

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

 

// interface LoginData {
//   emailOrUsername: string;
//   password: string;
// }

const Login: React.FC= ({navigation}) => {
  // const navigation = useNavigation();

  // const [users, setUsers] = useState<User[]>([]);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  const handleLogin = async () => {
    setLoading(true);
    try {
      // const loginData: LoginData = {
      //   emailOrUsername: emailOrUsername,
      //   password: password,
      // };

      const credentials: {email: string; password: string} = {
        email: emailOrUsername,
        password,
      };

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
        setError('Invalid email/username or password. Please try again.');
        return; // Exit early if no token or invalid data
      }

      const jwtToken = response.data.token;

      await AsyncStorage.setItem('jwtToken', jwtToken);

      navigation.navigate('Test', {token: jwtToken});

      // Navigate to the home screen or any other screen
      // props.navigation.dispatch('HomeScreen');
    } catch (error: unknown) {
      setLoading(false);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          // The request was made and the server responded with a status code
          // that falls outside the range of 2xx
          setError(
            `Error: ${axiosError.response.status} - ${axiosError.response.data}`,
          );
        } else if (axiosError.request) {
          // The request was made but no response was received
          // `axiosError.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in Node.js
          setError('Network Error');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error:', axiosError.message);
          setError('An unexpected error occurred.');
        }
      } else {
        console.error('Unknown error:', error);
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  // login();
  // }, [emailOrUsername, password]);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={styles.Contianer}>
        <Layout style={styles.h1}>
          <Text category="h1">Login</Text>
        </Layout>
        <Layout style={styles.layout}>
          <Layout style={styles.layout2}>
            <Text category="h5">Username or email</Text>
            <Input
              style={styles.input}
              keyboardType="email-address"
              placeholder="example.com"
              onChangeText={text => setEmailOrUsername(text)}
            />
            <Text category="h5">Password</Text>
            <Input
              secureTextEntry
              style={styles.input}
              placeholder="password"
              onChangeText={text => setPassword(text)}
            />
          </Layout>
        </Layout>
        <Layout style={styles.layout3}>
          <Button onPress={handleLogin} style={[styles.logButton]}>
            <Text style={tw`text-xl  text-white`}>Login</Text>
          </Button>
          <Text style={tw`mt-5`}>Did not you have account?</Text>
          <Button onPress={() => navigation.push('SignUp')}>SignUp</Button>
          <Button onPress={() => navigation.push('Test')}>Test</Button>
        </Layout>
      </Layout>
    </ApplicationProvider>
  );
};

export default Login;
