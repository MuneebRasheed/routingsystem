/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import Base from '@base'
import { name as appName } from './app.json';

LogBox.ignoreAllLogs(true)

AppRegistry.registerComponent(appName, () => Base);