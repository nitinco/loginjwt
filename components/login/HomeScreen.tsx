import React from 'react';
import {View, Button, Text} from 'react-native';
// import {Router, Scene, Actions} from 'react-native-router-flux';

const HomeScreen = (props: {navigation: any}) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => props.navigation.navigate('Details')}
      />
    </View>
  );
};

export default HomeScreen;
