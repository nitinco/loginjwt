/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-catch-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import {FlatList, View} from 'react-native';
import * as eva from '@eva-design/eva';
import {useState, useEffect} from 'react';
import axios, {AxiosError, AxiosResponse} from 'axios';
import tw from 'twrnc';
import config from '../../config.json';
import Loader from '../loader/Loader';
import React from 'react';

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
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response: AxiosResponse<User[]> = await client.get<User[]>(
          '/users',
          {
            headers: {
              'Content-Type': 'application/json',
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
  }, []);
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Layout style={tw`h-full`}>
        <View>
          <Text style={tw`text-sky-100`}>Data</Text>
          {/* <Text style={{color: 'red'}}>{error}</Text> */}
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
        <Loader visible={loading} />
      </Layout>
    </ApplicationProvider>
  );
};

export default Test;
