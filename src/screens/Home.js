import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { sendNotification } from '../config/notificationsConfig';
import DateTimePicker from '../components/DateTimePicker';
import { formatDate } from '../helpers/dateHelpers';
import { addLog } from '../helpers/firebaseConsults';

export default function Home() {
  const [date, setDate] = useState(
    new Date(
      new Date().getYear() + 1900,
      new Date().getMonth() + 1,
      new Date().getDate(),
    ),
  );
  const [client, setClient] = useState('');
  const [article, setArticle] = useState('');
  const inputClient = useRef(null);

  function handleChangeClient(value) {
    setClient(value);
  }
  function handleChangeArticle(value) {
    setArticle(value);
  }
  function resetInputs() {
    setArticle('')
    setClient('')
    inputClient.current.focus();
  }

  function confirmSaveNotification(saved, notificationId) {
    if (saved) {
      Alert.alert('Notificacion Guardada');
      resetInputs();
      addLog(client, article, date, notificationId);
    } else {
      Alert.alert('Error al crear Notificacion o Datos invalidos');
    }
  }

  function handleSaveNotification() {
    sendNotification(client, article, date, confirmSaveNotification);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Nueva Notificacion</Text>
        <View>
          <TextInput
            ref={inputClient}
            style={styles.inpt}
            value={client}
            placeholder="Cliente"
            onChangeText={handleChangeClient}
          />
          <TextInput
            style={styles.inpt}
            value={article}
            placeholder="Articulo"
            onChangeText={handleChangeArticle}
          />
        </View>
        <View style={styles.dateTimePicker}>
          <Text style={{ fontSize: 17 }}>Dia: {formatDate(date)}</Text>
          <DateTimePicker onSelectedDate={setDate} />
        </View>
        <Button title="Guardar" onPress={handleSaveNotification} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  dateTimePicker: {
    marginBottom: 30,
    marginTop: 5,
  },
  vwHeader: {
    flex: 0.1,
  },
  inpt: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    marginBottom: 10,
    fontSize: 20,
  },
});