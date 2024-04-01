// screens/DetailsScreen.js

import React from 'react';
import { View, Button, Text } from 'react-native';

const DetailsScreen = ({ navigation }:{navigation:any}) => {
  return (
    <View>
      <Text>Details Screen</Text>
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      />
      <Button
        title="Go login"
        onPress={() => navigation.navigate('login')}
      />
    </View>
  );
};

export default DetailsScreen;
