import { Notifications } from 'expo';
import { changeHourOfDate, formatDate } from '../helpers/dateHelpers';
import { Alert } from 'react-native';

export function sendNotification(
  client,
  article,
  date,
  confirmSaveNotification,
) {
  let validDate = false;

  if (date > new Date() && client != '') {
    validDate = true;
    let dateNotification = changeHourOfDate(date);
    let title = article ? client + ' ' + article : client;

    let localNotification = {
      origin: 'selected',
      title: title,
      remote: false,
    };

    let schedulingOptions = {
      time: new Date().getTime() + 50000, //dateNotification.getTime() //
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
