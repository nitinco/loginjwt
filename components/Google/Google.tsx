import React, { useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid, Image, TouchableOpacity } from 'react-native';
import { GoogleSigninButton, GoogleSignin, statusCodes, isErrorWithCode } from '@react-native-google-signin/google-signin';
import Video from 'react-native-video';

GoogleSignin.configure();

const Google = () => {
  const [userInfo, setUserInfo] = useState(null);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfor = await GoogleSignin.signIn();
      setUserInfo(userInfor);
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            ToastAndroid.show("You Cancel the process", ToastAndroid.SHORT);
            break;
          case statusCodes.IN_PROGRESS:
            ToastAndroid.show("Wait already in process", ToastAndroid.SHORT);
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            ToastAndroid.show("Play services is not working yet", ToastAndroid.SHORT);
            break;
          default:
            ToastAndroid.show("We fix It As Soon As Possible", ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show("Sign in Successful", ToastAndroid.SHORT);
        // an error that's not related to google sign in occurred
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null)// Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Video
      source={require('../Google/bg.mp4')}
      resizeMode='cover'
      style={styles.backgroundVideo}
      repeat={true}
      />

      {userInfo != null && <Image source={{ uri: userInfo.user.photo }} style={{ height: 100, width: 100 }} />}

      {userInfo != null && <Text>{userInfo.user.name}</Text>}

      {userInfo != null && <Text>{userInfo.user.email}</Text>}
      {
        userInfo == null ? (
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            style={styles.googleBtn}
            onPress={() => {
              signIn();
            }}
          />
        ) : (
          <View style={styles.container2}>
            <TouchableOpacity onPress={()=>signOut()} >
            <Text  >Log Out</Text>
            </TouchableOpacity>
            
          </View>
        )
      }




    </View>
  );
};

export default Google;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container2: {
    height: 50,
    width: '50%',
    backgroundColor: 'black',
    borderRadius: 50,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '50%'
  },
  googleBtn: {
    borderRadius: 50,
    width: '50%',
    marginBottom: 20,
  }
});