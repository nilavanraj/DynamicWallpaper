import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useState} from 'react';
const allTime = [
  '1am',
  '2am',
  '3am',
  '4am',
  '5am',
  '6am',
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12am',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
  '8pm',
  '9pm',
  '10pm',
  '11pm',
  '12pm',
  ,
];
const SelectTimer = ({defaultValue, onValueChange}) => {
  const [timeZone, setTimeZone] = useState(defaultValue);
  return (
    <View style={styles.viewStyle}>
      <Picker
        style={styles.pickerStyle}
        selectedValue={timeZone}
        onValueChange={itemValue => {
          setTimeZone(itemValue);
          onValueChange(itemValue);
        }}>
        {allTime?.map(item => (
          <Picker.Item label={item} value={item} />
        ))}
      </Picker>
    </View>
  );
};
export default SelectTimer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyle: {
    width: 300,

    marginLeft: 20,
    marginRight: 20,
    borderColor: 'black',
    borderBottomWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20

  },
  textStyle: {
    margin: 24,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerStyle: {
    textDecorationLine: 'underline',
    width: '100%',
    borderWidth: 4,
    color: '#344953',
    justifyContent: 'center',
  },
});
