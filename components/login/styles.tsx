import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Contianer: {
    flex: 1,
    height: '100%',
    // backgroundColor:'purple',
    justifyContent: 'center',
    // paddingVertical:20,
  },
  h1: {
    textAlign: 'left',
    // justifyContent:'top',
    alignItems: 'center',
    marginBottom: '40%',
  },
  layout: {
    alignItems: 'center',
    // backgroundColor:'red',
    textAlign: 'left',
  },
  layout2: {
    // backgroundColor:'green',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  input: {
    width: '90%',
    marginVertical: 10,
  },
  layout3: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  logButton: {
    marginTop: 5,
    textAlign: 'center',
    width: '60%',
    height: '18%',
    backgroundColor: '#0e649a',
  },
  logoutButton: {
    marginTop: 0,
    textAlign: 'center',
    width: '60%',
    height: '18%',
    backgroundColor: '#0e649a',
  },
});

export default styles;
