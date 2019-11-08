import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const config = {
  apiKey: "AIzaSyAZMbLEK8VREupFhpkUir1Wb3YNRe12Ulk",
  authDomain: "e-commerce-275e1.firebaseapp.com",
  databaseURL: "https://e-commerce-275e1.firebaseio.com",
  projectId: "e-commerce-275e1",
  storageBucket: "e-commerce-275e1.appspot.com",
  messagingSenderId: "661311488204",
  appId: "1:661311488204:web:660746044ef5377a5a0269"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
