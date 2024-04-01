import React from 'react';
import { View, Button, Text } from 'react-native';

const HomeScreen = ({ navigation }:{navigation:any}) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
        
      />
    </View>
  );
};

export default HomeScreen;
