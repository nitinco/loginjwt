/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../login/styles';
import tw from 'twrnc';
import config from '../../config.json';

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

const Test: React.FC = () => {
  const navigation = useNavigation();
  // export default function Test() {

  const route = useRoute();
  const {token} = route.params; // Access the passed token from navigation params

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<User[]> = await client.get<User[]>(
          '/users',
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
          },
        );
        setUsers(response.data);
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
  }, [token]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('jwtToken');
      navigation.navigate('Test', {token: token});
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

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={styles.layout3}>
        <View>
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
          <Button onPress={handleLogout} style={[styles.logoutButton]}>
            <Text style={tw`text-xl  text-white`}>Logout</Text>
          </Button>
        </View>
      </Layout>
    </ApplicationProvider>
  );
};

export default Test;
