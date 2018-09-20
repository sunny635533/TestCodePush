// import {
//     AppRegistry
// } from 'react-native';

// import App from './App';
// AppRegistry.registerComponent('Main', () => App);

// for dismiss warning
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Warning: Class RCTCxxModule was not exported.', 'Class RCTCxxModule']);


// import './ReactotronConfig';
import '@src/main/main';