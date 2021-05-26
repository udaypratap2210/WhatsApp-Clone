import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyC2VD5qp5OpOrIgSbHkY8wkE1eQCBOnG40",
  authDomain: "whatsapp-clone-acc62.firebaseapp.com",
  projectId: "whatsapp-clone-acc62",
  storageBucket: "whatsapp-clone-acc62.appspot.com",
  messagingSenderId: "381677139318",
  appId: "1:381677139318:web:529e4269e0f98392633657",
  measurementId: "G-66VEHBT64M",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
