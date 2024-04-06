import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components'
import * as eva from '@eva-design/eva';
import axios from 'axios'


export default function Test() {


  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout>
      <Text style={{justifyContent:'center',alignItems:'center'}}>Test</Text>
    </Layout>
    </ApplicationProvider>
    
      
    
  )
}

const styles = StyleSheet.create({})