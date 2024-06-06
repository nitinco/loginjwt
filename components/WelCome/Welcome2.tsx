import React, { Component ,useState } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View,ToastAndroid } from 'react-native'
import { GoogleSigninButton, GoogleSignin, statusCodes, isErrorWithCode } from '@react-native-google-signin/google-signin';
import Video from 'react-native-video'
import tw from 'twrnc'

GoogleSignin.configure();

const Welcome2 : React.FC = ({navigation}) =>  {

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
                    source={require('../Google/bg2.mp4')}
                    style={styles.BackgroundVideo}
                    resizeMode='cover'
                    repeat={true}
                    muted={true}
                />

                <View style={styles.container2}>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Sign-up with Email or Phone</Text>
                    </TouchableOpacity>

                    <GoogleSigninButton
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Light}
                        style={styles.googleBtn}
                        onPress={() => {
                              signIn();
                        }}
                    />
                    <View>
                        <Text style={styles.text} >Already Have a account? 
                            <TouchableOpacity onPress={()=> navigation.push('Login')}>
                                <Text style={styles.text2}>Login</Text>
                            </TouchableOpacity> </Text>
                    </View>

                </View>


            </View>
        )
    }
export default Welcome2;

const styles = StyleSheet.create({

    BackgroundVideo: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    container2: {
        height: 250,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        // backgroundColor: '#D507D9',
        marginBottom: 20
    },
    text: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    text2: {
        fontSize: 20,
        color: '#D600F9',
        textAlign: 'center'
    },
    btn: {
        width: '80%',
        height: 50,
        padding: 10,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10

    },
    googleBtn: {
        marginTop: 5,
        height: 50,
        width: '82.5%',

        // marginBottom: 20,
    }

})