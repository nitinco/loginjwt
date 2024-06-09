/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {useNavigation} from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import styles from '../login/styles';
import tw from 'twrnc';
import config from '../../config.json';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StorageType, TokenStorage} from '../JWT/tokenStorage';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../RootStackParamList';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction, logoutAction} from '../store/auth/userActions';

const client = axios.create({
  baseURL: config.baseUrl, // Inject the base URL
});

interface User {
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

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const tokenStorage = new TokenStorage(StorageType.Keychain);

  const dispatch = useDispatch();

  const [storedToken, setStoredToken] = useState<string | null>(null);

  // const route = useRoute();
  // const {token} = route.params; // Access the passed token from navigation params

  // const storedToken = await tokenStorage.getToken();
  // console.log('Stored Token:', storedToken);

  // setStoredToken(token);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isSignedIn = useSelector(state => state.authData.isSignedIn);

  const token = useSelector(state => state.authData.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isSignedIn) {
          console.log('condition is true');
          const authToken = token;
          const response: AxiosResponse<User[]> = await client.get<User[]>(
            '/users',
            {
              headers: {
                Authorization: `Bearer ${authToken}`, // Include token in Authorization header
              },
            },
          );
          setUsers(response.data);
        } else {
          throw new Error('No token found');
        }
      } catch (error: unknown) {
        // Handle unknown errors
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

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    try {
      // await AsyncStorage.removeItem('jwtToken');
      await tokenStorage.removeToken();
      navigation.navigate('Login');
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
    }
  };

  if (isSignedIn) {
    return (
      <ApplicationProvider {...eva} theme={eva.dark}>
        <Layout style={styles.layout3}>
          {isSignedIn ? (
            <Text>You are logged in </Text>
          ) : (
            <Text>You are not logged in </Text>
          )}
          <View>
            <View style={tw`h-100`}>
              <Text style={{color: 'black'}}>User Data</Text>
              <FlatList
                data={users}
                renderItem={({item}) => (
                  <View key={item.id}>
                    <Text style={{color: 'black'}}>ID: {item.id}</Text>
                    <Text style={{color: 'black'}}>
                      Full Name: {item.fullName || 'N/A'}
                    </Text>
                    <Text style={{color: 'black'}}>Email: {item.email}</Text>
                    <Text style={{color: 'black'}}>
                      Enabled: {item.enabled ? 'Yes' : 'No'}
                    </Text>
                  </View>
                )}
              />
            </View>
            <TouchableOpacity
              // onPress={handleLogout}
              onPress={() => dispatch(logoutAction())}
              style={tw`bg-indigo-500 items-center rounded-3 py-2 m-5`}>
              <Text style={tw`text-xl  text-white`}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(loginAction())}
              style={tw`bg-indigo-500 items-center rounded-3 py-2 m-5`}>
              <Text style={tw`text-xl  text-white`}>Data</Text>
            </TouchableOpacity>
          </View>
        </Layout>
      </ApplicationProvider>
    );
  } else {
    navigation.navigate('Login');
    return (
      <ApplicationProvider {...eva} theme={eva.dark}>
        <Layout style={styles.layout3}>
          <View>
            <Text>You have to be Looged in to access this page</Text>
          </View>
        </Layout>
      </ApplicationProvider>
    );
  }
};

export default Home;
