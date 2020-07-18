import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { formatDate } from '../../helpers/dateHelpers';

export default function DateTimePicker(props) {
  const { legend, iconColor, date, onSelectedDate } = props
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    onSelectedDate(date);
  };

  return (
    date ?
      <View style={styles.container}>
        <TouchableOpacity onPress={showDatePicker}>
          <View style={styles.legendContent}>
            <Icon
                containerStyle={styles.icon} 
                name='calendar'
                size={20}
                type='font-awesome'
                color={iconColor}
              />
            <Text style={styles.legend}>{legend}</Text>
          </View>
          <View style={styles.dateContent} >
            <Text style={styles.txtDate}>{formatDate(date)}</Text>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        </TouchableOpacity>
      </View> 
    :
      <View></View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#efefef',
    borderRadius: 5,
    marginBottom: 15,
    marginHorizontal: 10
  },
  legendContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dateContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#efefef',
    borderBottomWidth: 1,
    borderColor: '#86939e',
    marginBottom: 5,
  },
  legend: {
    color: '#1885f2',
    fontSize: 18
  },
  txtDate: {
    fontSize: 16,
    color: '#4d4f5c',
    marginBottom: 5,
  },
  icon: {
    marginRight: 3
  }
});