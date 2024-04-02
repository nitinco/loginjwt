/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import login from './components/login/login';
import DetailsScreen from './components/login/DetailScreen';

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => DetailsScreen);
// AppRegistry.registerComponent(appName, () => login);