var admin = require("firebase-admin");

var serviceAccount = require("../credentials/sos-vecinal-bd10b-firebase-adminsdk-m81ws-79307198f7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sos-vecinal-bd10b-default-rtdb.firebaseio.com"
});

const db = admin.firestore();
const userRef = db.collection('users');
const incidentRef = db.collection('incidents');

module.exports = { userRef, incidentRef };