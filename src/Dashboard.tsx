/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  NativeModules,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useSelector, useDispatch} from 'react-redux';
import SelectionTimer from './components/SelectTimer';
import {
  setallTimeZone,
  setTimeZone,
  setTimeNow,
  setWallPaperImage,
} from './store/Timer';
import moment from 'moment-timezone';
import LTForegroundService from 'react-native-foreground-service-android';
import WallPaperManager from 'react-native-set-wallpaper';
import BackgroundTimer from 'react-native-background-timer';

console.log('NativeModules', NativeModules);
let ref: number;
interface WP {
  time: string;
  wallpaper: string;
}
interface Timer {
  allTimeZone: string[];
  timeZone: string;
  timeNow: moment.Moment;
  wallPaperImage: WP[];
}
interface T {
  Timer: Timer;
}

const Dashboard = () => {
  const {allTimeZone, timeZone, wallPaperImage}: any = useSelector<T>(
    state => state.Timer,
  );
  const timeZoneRef = useRef<string>();
  const [disable, setDisble] = useState<Boolean>(true);
  const [onFG, setonFG] = useState<Boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const timeZones: string[] = moment.tz.names();
    dispatch(setallTimeZone(timeZones));
  }, []);

  useEffect(() => {
    if (!onFG && ref) {
      BackgroundTimer.clearInterval(ref!);
      LTForegroundService.stopService();
    }
  }, [onFG]);

  const onPressHandle = (index: number) => {
    const ImagePicker = require('react-native-image-picker');
    ImagePicker.launchImageLibrary(
      {
        quality: 0.5,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true,
        },
      },
      (props: {assets: {uri: any}[]}) => {
        if (props?.assets?.[0]) {
          setWallpaperArray(props.assets[0].uri, index, 'wallpaper');
        }
      },
    );
  };

  useEffect(() => {
    setDisble(
      wallPaperImage.length == 2 &&
        !wallPaperImage.every((item: WP) => item.wallpaper && item.time),
    );
  }, [wallPaperImage]);

  const onPressForeGround = () => {
    setonFG(preState => !preState);
    const notificationConfig = {
      channelId: '1',
      id: 1,
      title: 'Title',
      text: 'Some text',
      icon: 'ic_icon',
      ongoing: true, // default false
    };
    try {
      console.log('onPressForeGround');
      LTForegroundService.startService(notificationConfig);
      const memoArr: string[] = [];
      if (ref) {
        BackgroundTimer.clearInterval(ref!);
      }

      ref = BackgroundTimer.setInterval(() => {
        var currentTime: moment.Moment = moment().utc();
        for (let i = 0; i < wallPaperImage.length; i++) {
          if (
            currentTime
              .tz(timeZoneRef.current!)
              ?.isAfter(moment(wallPaperImage[i].time, 'h:mma')) &&
            !memoArr.some(item => item == wallPaperImage[i].time)
          ) {
            memoArr.push(wallPaperImage[i].time);
            console.log('timere');
            WallPaperManager.setWallpaper(
              {
                uri: wallPaperImage[i].wallpaper,
              },
              (res: any) => {
                console.log(res);
              },
            );
            break;
          }
        }
      }, 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const setWallpaperArray = (item: string, index: number, type: string) => {
    const wallPaperImageCopy = [...wallPaperImage];
    wallPaperImageCopy[index] = {...wallPaperImageCopy[index], [type]: item};
    dispatch(setWallPaperImage(wallPaperImageCopy));
  };
  var currentTime: moment.Moment = moment().utc();
  console.log(currentTime.tz(timeZone).format('ha z'));
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.viewStyle}>
        <Picker
          style={styles.pickerStyle}
          selectedValue={timeZone}
          onValueChange={itemValue => {
            timeZoneRef.current = itemValue;
            dispatch(setTimeZone(itemValue));
          }}>
          {allTimeZone?.map((item: string) => (
            <Picker.Item label={item} value={item} />
          ))}
        </Picker>
      </View>

      {[...Array(2)].map((i, index) => (
        <>
          <SelectionTimer
            defaultValue={wallPaperImage[index].time}
            onValueChange={(item: string) => {
              setWallpaperArray(item, index, 'time');
            }}
          />
          <TouchableOpacity
            style={styles.imageSelector}
            onPress={() => {
              onPressHandle(index);
            }}>
            {wallPaperImage[index]?.wallpaper ? (
              <Image
                style={styles.wallpaper}
                source={{
                  uri: wallPaperImage[index]?.wallpaper,
                }}
              />
            ) : (
              <Text> Click here to Select </Text>
            )}
          </TouchableOpacity>
        </>
      ))}
      <TouchableOpacity
        disabled={disable}
        onPress={onPressForeGround}
        style={[styles.button, {opacity: disable ? 0.5 : 1,  backgroundColor: onFG?'#00FF00':'#841584',}]}>
        <Text style={styles.buttonText}>{onFG?"Service running":'Start' }</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 10,
  },
  imageSelector: {
    width: '90%',
    height: '20%',
    borderColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyle: {
    width: 300,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  textStyle: {
    margin: 24,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerStyle: {
    width: '100%',
    borderWidth: 4,
    color: '#344953',
    justifyContent: 'center',
  },
  wallpaper: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    opacity: 0.5,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
export default Dashboard;
