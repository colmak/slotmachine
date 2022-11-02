


// Initialize Cloud Firestore and get a reference to the service
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();                    // Make Fiorestore Reference.
db.settings({timestampsInSnapshots:true}); 