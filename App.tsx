/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import store from './src/store/store';
import {Provider} from 'react-redux';
import Dashboard from './src/Dashboard';
import LTForegroundService, {
  IChannelConfig,
  INotificationConfig,
} from "react-native-foreground-service-android";

const channelConfig: IChannelConfig = {
  id: "1",
  name: "wallpaper",
  description: "Dynamic Wallpaper",
  enableVibration: false,
};
LTForegroundService.createNotificationChannel(channelConfig);

const App = () => {
  // useEffect(() => {
  //   const ImagePicker = require('react-native-image-picker');
  //   ImagePicker.launchImageLibrary(
  //     {
  //       quality: 0.5,
  //       maxWidth: 500,
  //       maxHeight: 500,
  //       storageOptions: {
  //         skipBackup: true,
  //       },
  //     },
  //     (props: {assets: {uri: any}[]}) => {
  //       console.log('props', props.assets[0].uri);

  //       WallPaperManager.setWallpaper(
  //         {
  //           uri: props.assets[0].uri,
  //         },
  //         (res: any) => {
  //           console.log(res);
  //         },
  //       );
  //     },
  //   );
  // });

  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
};

export default App;
