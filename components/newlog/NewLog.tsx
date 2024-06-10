import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  Pressable,
} from 'react-native';
import {useTheme} from '../../ThemeContext';
import tw from 'twrnc';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const containerAnim = useRef(new Animated.Value(0)).current;
  const emailLabelAnim = useRef(new Animated.Value(0)).current;
  const passwordLabelAnim = useRef(new Animated.Value(0)).current;

  const {theme, toggleTheme} = useTheme();

  const handleLogin = () => {
    Alert.alert('Login button pressed', `Email: ${email}`);
  };

  const animateContainer = (anim, toValue) => {
    Animated.timing(anim, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const animateLabel = (anim, toValue) => {
    Animated.timing(anim, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <SafeAreaView
      style={tw`flex ${
        theme === 'light' ? 'bg-light-primary' : 'bg-dark-primary'
      } justify-center p-[16] h-full`}>
      <View style={tw`flex`}>
        <Image
          style={tw`w-[50] h-[50] mx-auto my-10`}
          src={'https://reactnative.dev/img/tiny_logo.png'}
        />
      </View>
      <View style={tw`mb-[32]`}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Please sign in to continue.</Text>

        {/* Pass Word Animated View ==== Start ==== */}
        <Animated.View
          style={[
            tw`rounded-2 my-5`,
            {
              backgroundColor: emailLabelAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['#121212', '#1E1E1E'],
              }),
              // shadowColor: '#00E6FF',
              shadowColor: emailLabelAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['#121212', '#00E6FF'],
              }),
              elevation: emailLabelAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 20],
              }),
            },
          ]}>
          <View style={tw`relative my-[16]`}>
            <Animated.Text
              style={[
                styles.label,
                {
                  top: emailLabelAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, -10],
                  }),
                  fontSize: emailLabelAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 12],
                  }),
                  color: emailLabelAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#888', '#00E6FF'],
                  }),
                },
              ]}>
              Email
            </Animated.Text>
            <TextInput
              style={styles.input}
              onFocus={() => {
                animateLabel(emailLabelAnim, 1);
                animateContainer(containerAnim, 1);
              }}
              onBlur={() => {
                email === '' && animateLabel(emailLabelAnim, 0);
                containerAnim.setValue(0);
                // animateContainer(containerAnim, 0);
              }}
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCompleteType="email"
            />
          </View>
        </Animated.View>
        {/* Pass Word Animated View ==== END ==== */}

        {/* Pass Word Animated View ==== Start ==== */}
        <Animated.View
          style={[
            tw`rounded-2 my-5`,
            {
              backgroundColor: passwordLabelAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['#121212', '#1E1E1E'],
              }),
              // shadowColor: '#00E6FF',
              shadowColor: passwordLabelAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['#121212', '#00E6FF'],
              }),
              elevation: passwordLabelAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 20],
              }),
            },
          ]}>
          <View style={tw`relative`}>
            <Animated.Text
              style={[
                styles.label,
                {
                  top: passwordLabelAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [25, 5],
                  }),
                  fontSize: passwordLabelAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 12],
                  }),
                  color: passwordLabelAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#888', '#00E6FF'],
                  }),
                },
              ]}>
              Password
            </Animated.Text>
            <TextInput
              style={[styles.input, tw`pt-8`]}
              onFocus={() => {
                animateLabel(passwordLabelAnim, 1);
                animateContainer(containerAnim, 1);
              }}
              onBlur={() => {
                password === '' && animateLabel(passwordLabelAnim, 0);
                containerAnim.setValue(0);
              }}
              onChangeText={setPassword}
              value={password}
              secureTextEntry
              autoCompleteType="password"
            />
          </View>
        </Animated.View>
        {/* Pass Word Animated View ==== END ==== */}

        <TouchableOpacity
          style={tw`bg-[#00E6FF] rounded-4`}
          onPress={handleLogin}>
          <Text style={tw`text-[#121212] text-xl mx-auto my-3`}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={tw`flex flex-row mx-auto`}>
          <Text>Already Have an Account?</Text>
          <Pressable onPress={() => navigation.navigate('CreateAccount')}>
            <Text style={tw`text-[#00E6FF]`}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 16,
  },
  formContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  label: {
    position: 'absolute',
    left: 16,
    paddingHorizontal: 4,
  },
  input: {
    color: '#fff',
    paddingHorizontal: 16,
    fontSize: 16,
    zIndex: -1,
  },
  button: {
    backgroundColor: '#00E6FF',
    borderRadius: 8,
    // paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  buttonText: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;
