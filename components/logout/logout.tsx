/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import styles from '../login/styles';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';

const Logout: React.FC = () => {
  const navigation = useNavigation();
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <View>
        <Text style={{color: 'black'}}>User Data</Text>
        <Layout style={styles.layout3}>
          <Button
            onPress={() => navigation.navigate('Login')}
            style={[styles.logButton]}>
            <Text style={tw`text-xl  text-white`}>Login</Text>
          </Button>
        </Layout>
      </View>
    </ApplicationProvider>
  );
};

export default Logout;
