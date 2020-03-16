import { Notifications } from 'expo';
import { Platform } from 'react-native';
import { changeHourOfDate, formatDate } from '../helpers/dateHelpers';
import { Alert } from 'react-native';

export function sendNotification(
  client,
  article,
  date,
  confirmSaveNotification,
) {
  let validDate = false;

  if (date > new Date() && client !== '' && article !== '') {
    validDate = true;
    let dateNotification = changeHourOfDate(date);
    let title = article ? client + ' ' + article : client;

    let localNotification = {
      origin: 'selected',
      title: title,
      body: "Te recordamos para que no olvides llamar a tus clientes. Pueden estar necesitando racion! Hoy deberias averiguar si " +
        client.toUpperCase() + " necesita " + article.toUpperCase() + " en los proximos dias",
      remote: false,
      android: {
        channelId: 'call-notifications'
      },
    };

    let schedulingOptions = {
      time: new Date().getTime() + 20000, //dateNotification.getTime() //
    };

    Alert.alert(
      'Nueva Notificacion',
      'Confirma una notificacion para el dia ' + formatDate(date) + ' para ' + client + '?',
      [
        {
          text: 'Modificar',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions).then(
              (response) => confirmSaveNotification(true, response),
              (err) => confirmSaveNotification(false, err)
            )
          },
        },
      ],
      { cancelable: false },
    );
  }

  if (!validDate) {
    confirmSaveNotification(false);
  }
}

export function dismissNotification(notificationId) {
  //console.warn(notificationId);
  Notifications.cancelScheduledNotificationAsync(notificationId)
}

export function createChannelNotification() {
  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('call-notifications', {
      name: 'Call clients',
      description: 'Para que no olvides llamar a tus clientes. Pueden estar necesitando racion!',
      sound: true,
      priority: 'high',
      vibrate: true,
      badge: true
    });
  }

}
