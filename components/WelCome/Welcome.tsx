import React, { Component } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Video from 'react-native-video'
// import tw from 'twrnc'

const Welcome:React.FC = ({navigation}) => {
    
        return (
            <View style={styles.container}>

                <Video
                    source={require('../Google/bg.mp4')}
                    style={styles.BackgroundVideo}
                    resizeMode='cover'
                    repeat={true}
                    muted={true}
                />

                <View style={styles.container2}>
                    <Text style={styles.text}>Welcome !</Text>
                    <Text style={styles.text2}>
                        Student to This beautiful application designed by us
                        - Team Clubs
                    </Text>
                    <TouchableOpacity style={styles.btn} onPress={()=>navigation.push('Welcome2')}>
                        <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>Get strted</Text>
                    </TouchableOpacity>

                </View>


            </View>
        )
    }
export default Welcome;

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
        fontSize: 30,
        color: 'white',
        textAlign: 'center'
    },
    text2: {
        width: '50%',
        marginBottom: 2,
        textAlign: 'center',
        color: 'white'
    },
    btn:{
        width:'80%',
        height:50,
        padding:10,
        borderRadius:20,
        backgroundColor:'#D507D9',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10

    }

})