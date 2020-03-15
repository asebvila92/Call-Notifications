import firebase from '../config/firebaseConfig'

export function fetchLogs() {
  return new Promise((resolve, reject) => {
    let db = firebase.firestore();
    db.collection("Notifications")
      .get()
      .then((querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => {
          const id = doc.id
          const data = doc.data()
          return { id, ...data }
        })
        const logs = docs.length === 0 ? null : docs;
        resolve(logs)
      });
  })
}

export function addLog(client, article, date, notificationId) {
  return new Promise((resolve, reject) => {
    let db = firebase.firestore();
    db.collection("Notifications").add({
      article: article,
      client: client,
      lastDelivery: new Date(),
      nextDelivery: date,
      notificationId: notificationId
    })
      .then((docRef) => {
        //console.warn("Docuemnt number: " + docRef.id)
      })
  })
}

export function deleteLog(logId) {
  return new Promise((resolve, reject) => {
    let db = firebase.firestore();
    db.collection("Notifications")
      .doc(logId)
      .delete()
  })
}