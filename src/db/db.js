import Firebase from 'firebase'
 let config = {
    apiKey: "AIzaSyB8_VNP4J66aklDKM40iEiyuV0K7nLRGRY",
    databaseURL: "https://gns-test-946e9.firebaseio.com/",
    projectId: "gns-test-946e9"
 
  };

let app = Firebase.initializeApp(config);

export const db = app.database();
