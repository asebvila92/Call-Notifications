import firebase from '../config/firebaseConfig'

export function fetchLogs() {
  return new Promise((resolve, reject) => {
    let db = firebase.firestore();
    db.collection("Notifications")
      .get()
      .then((querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => {
          return doc.data()
        })
        const logs = docs.length === 0 ? null : docs;
        resolve(logs)
      });
  })
}

export function addLog(client, article, date) {
  return new Promise((resolve, reject) => {
    let db = firebase.firestore();
    db.collection("Notifications").add({
      article: article,
      client: client,
      lastDelivery: new Date(),
      nextDelivery: date
    })
      .then((docRef) => {
        //console.warn("Docuemnt number: " + docRef.id)
      })
  })
}