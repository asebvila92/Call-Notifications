import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import InputWithLabel from './inputWithLabel';
import { formatDate } from '../../helpers/dateHelpers'; 

export default function EditDateTimePicker(props) {
  const { label, date, onSelectedDate } = props
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
    <TouchableOpacity onPress={showDatePicker}>
      <InputWithLabel label={label} type='date' value={formatDate(date)} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </TouchableOpacity>
  );
}