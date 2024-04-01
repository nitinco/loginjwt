// import React from 'react';
// import { Button, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';

// const TextInputExample = () => {
//     const [text, onChangeText] = React.useState('');
//     const [number, onChangeNumber] = React.useState('');

//     return (
//         <SafeAreaView>
//             <View style={styles.forum}>
//                 <TextInput
//                     style={styles.input}
//                     onChangeText={onChangeText}
//                     placeholder='email-id or username'
//                     keyboardType='email-address'
//                     value={text}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     onChangeText={onChangeNumber}
//                     value={number}
//                     placeholder="password"
//                     keyboardType="numeric"
//                 />
//                 <Button
//                 title='Login'
//                 onPress={}
//                 />
//             </View>

//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     forum:{
//         alignItems:'center',
//         backgroundColor:'red'
    
//     },
//     input: {
//         width:'80%',
//         height: 40,
//         margin: 12,
//         borderWidth: 1,
//         padding: 10,
//     },
   
// });

// export default TextInputExample;
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text,Input,Button } from '@ui-kitten/components';


const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category='h1'>HOME</Text>
  </Layout>
);

export function InputSimpleUsageShowcase({ navigation }:{navigation:any}): React.ReactElement {

  const [value, setValue] = React.useState('');

  return (
    <Layout style={{ alignContent: 'center', alignItems: "center" }}>
      <Input
        placeholder='Email or username'
        value={value}
        keyboardType='email-address'
        onChangeText={nextValue => setValue(nextValue)} />
      <Input
        placeholder='Password'
        value={value}
        keyboardType='email-address'
        onChangeText={nextValue => setValue(nextValue)} />
      <Button
        onPress={() => navigation.navigate('Details')}
      >log in</Button>
    </Layout>

  );
}


export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    {/* <HomeScreen /> */}
    <InputSimpleUsageShowcase />
  </ApplicationProvider>
);