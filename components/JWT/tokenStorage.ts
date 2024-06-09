import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StorageType {
  Keychain,
  AsyncStorage,
}

export class TokenStorage {
  storageType: StorageType;

  constructor(storageType: StorageType) {
    this.storageType = storageType;
  }

  // Store the JWT token
  async storeToken(jwtToken: string): Promise<void> {
    if (this.storageType === StorageType.Keychain) {
      try {
        await Keychain.setGenericPassword('jwtToken', jwtToken);
        console.log('Token stored successfully');
      } catch (error) {
        console.error('Failed to save the token to keychain', error);
      }
    } else if (this.storageType === StorageType.AsyncStorage) {
      try {
        await AsyncStorage.setItem('jwtToken', jwtToken);
        console.log('Token stored successfully');
      } catch (error) {
        console.error('Failed to save the token to storage', error);
      }
    }
  }

  // Retrieve the JWT token
  async getToken(): Promise<string | null> {
    if (this.storageType === StorageType.Keychain) {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          console.log('Token retrieved successfully');
          return credentials.password; // The JWT token is stored in the password field
        } else {
          console.log('No token stored');
          return null;
        }
      } catch (error) {
        console.error('Failed to fetch the token from keychain', error);
        return null;
      }
    } else if (this.storageType === StorageType.AsyncStorage) {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (token) {
          console.log('Token retrieved successfully');
          return token;
        } else {
          console.log('No token stored');
          return null;
        }
      } catch (error) {
        console.error('Failed to fetch the token from storage', error);
        return null;
      }
    }
    return null;
  }

  // Remove the JWT token
  async removeToken(): Promise<void> {
    if (this.storageType === StorageType.Keychain) {
      try {
        await Keychain.resetGenericPassword();
        console.log('Token removed successfully');
      } catch (error) {
        console.error('Failed to remove the token from keychain', error);
      }
    } else if (this.storageType === StorageType.AsyncStorage) {
      try {
        await AsyncStorage.removeItem('jwtToken');
        console.log('Token removed successfully');
      } catch (error) {
        console.error('Failed to remove the token from storage', error);
      }
    }
  }
}
