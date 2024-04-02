import { View,StyleSheet, Dimensions} from 'react-native'
import React from 'react'

const height = Dimensions.get('window');

const styles = StyleSheet.create(
    {
    h1:{
        textAlign:'center',
        justifyContent:'flex-start'
    },
    layout:{
        height:'100%',
        justifyContent:'center'
    },
    layout2:{
       alignItems:'center',
       textAlign:'center',
    },
    input:{
        width:'80%'

    },
    logButton:{
        marginTop:10,
        width:'80%',
        alignItems:'center',
  
    }
})

export default styles