import Firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyCT-iaQEeL6upXQQ4mxmiDyh5j6KEyu_8Y",
  authDomain: "instagram-c62a5.firebaseapp.com",
  projectId: "instagram-c62a5",
  storageBucket: "instagram-c62a5.appspot.com",
  messagingSenderId: "928064043183",
  appId: "1:928064043183:web:28d60ac34d92ba13cd3c5a",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
