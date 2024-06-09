/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */

import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {TouchableHighlight, TouchableOpacity, View} from 'react-native';
// import {Button} from 'react-native-paper';
import styles from '../login/styles';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';
import {Animated, Button} from 'react-native-paper';

const Logout: React.FC = () => {
  const navigation = useNavigation();

  // const [isPressed, setIsPressed] = useState(false);
  // const scale = useSpring(isPressed ? 0.95 : 1); // Adjust for press depth
  // const buttonColor = isPressed ? 'primary-600' : 'primary-500';

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <View>
        <Layout style={styles.layout3}>
          <Text style={{color: 'black'}}>User Data</Text>
          <Button mode="contained-tonal" style={tw`bg-primary-500`}>
            <Text style={tw`text-xl  text-white`}>Login</Text>
          </Button>
          <TouchableOpacity activeOpacity={0.5}>
            <View style={tw`bg-sky-500 px-6 py-2 rounded-4`}>
              <Text style={tw`text-white`}>Login</Text>
            </View>
          </TouchableOpacity>
        </Layout>
      </View>
    </ApplicationProvider>
  );
};

export default Logout;

// import React, { useState, useRef, useEffect } from 'react';
// import { Animated, Button } from 'react-native-paper';

// const LoginButton = () => {
//   const [isPressed, setIsPressed] = useState(false);
//   const scale = useRef(new Animated.Value(1)).current;

//   const handlePress = () => {
//     setIsPressed(!isPressed);
//     // Simulate some login action here (optional)

//     Animated.timing(scale, {
//       toValue: 0.9, // Adjust for desired press depth
//       duration: 150, // Adjust for animation speed
//       useNativeDriver: true, // Improve performance (optional)
//     }).start();
//   };

// useEffect(() => {
//   Animated.spring(scale, {
//     toValue: 1,
//     tension: 40, // Adjust for animation bounciness
//     friction: 7, // Adjust for animation speed
//     useNativeDriver: true, // Improve performance (optional)
//   }).start();
// }, [isPressed]); // Re-run animation on state change

//   const buttonColor = isPressed ? 'primary-600' : 'primary-500';

//   return (
//     <Animated.View style={{ transform: [{ scale }] }}>
//       <Button
//         mode="contained"
//         style={{ backgroundColor: buttonColor }}
//         onPress={handlePress}
//         labelStyle={{ color: 'white' }}
//       >
//         Login
//       </Button>
//     </Animated.View>
//   );
// };

// export default LoginButton;
