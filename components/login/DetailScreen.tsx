// screens/DetailsScreen.js

import React from 'react';
import {View, Button, Text} from 'react-native';

const DetailsScreen = (props: {navigation: any}) => {
  return (
    <View>
      <Text>Details Screen</Text>
      <Button title="Go back" onPress={() => props.navigation.goback()} />
      <Button
        title="Go login"
        onPress={() => props.navigation.navigate('Signup')}
      />
    </View>
  );
};

export default DetailsScreen;
