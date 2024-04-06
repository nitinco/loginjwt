import { Image, StyleSheet, View, Animated, } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import AsyncStorage from 'react-native'

const [jwtToken,setJwtToken] = useState(null)

// const isJwtToken = async() =>{
// useEffect(()=>{
//     getStoredToken();
// },[]);


// const getStoredToken = async(props:{navigation:any}) =>{
//     try {

//         // const token = await AsyncStorage.getItem('jwtToken');/
//         const token = await AsyncStorage.getItem(jwtToken);
//         if(token!=null){
//             setJwtToken(token)
//             props.navigation.navigate('Home')
//         }
        
//     } catch (error) {
//         console.error('Jwt key is not found:', error);
//         props.navigation.navigate('Login')
        
//     }
// }


// }






export default function SplashScreen(props:{navigation:any}) {

    const fadeAnim = useRef(new Animated.Value(0)).current;


// it is for animation of the splash screen

    useEffect(() => {
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }
        ).start();
      }, [fadeAnim]);


      //this for stop splash screen for 2 second

    useEffect(()=>{
        setTimeout(() => {
            props.navigation.replace('Login')
            
        }, 1000);
    })


    //check token is available or not
    // useEffect(() => {
    //   checkToken();
    // }, []);

    // const checkToken = async () => {
    //   try {
    //     const token = await AsyncStorage.getItem('jwtToken');
    //     if (token !== null) {
    //       //for success to get token
    //       props.navigation.replace('HomeScreen');
    //     } else {
    //       // for failure for get token
    //       props.navigation.replace('LoginScreen');
    //     }
    //   } catch (error) {
    //     console.error('Error checking token:', error);
        
    //   }
    // };



  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
        <Animated.View
      style={{
        opacity: fadeAnim, 
      }}
    >
        <Layout style={{backgroundColor:'black', height:'100%',justifyContent:'center',alignItems:'center'}}>
        <Animated.Image
        source={require('../SplashScreen/rtulogo.jpeg')}
        style={{
          width: 200,
          height: 200,
          borderRadius:50,
          transform: [{ scale: fadeAnim }], // Bind scale to animated value
        }}/>
            <Text category='h1' style={{textAlign:'center'}}>welcome to Rtu clubs</Text>
        </Layout>
        </Animated.View>
    </ApplicationProvider>
  )
}

const styles = StyleSheet.create({

    // image:{
    //     height:200,
    //     width:200,
    //     
    // }

})



