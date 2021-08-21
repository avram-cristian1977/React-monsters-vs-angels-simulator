import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCvAzMeYyYO2IpyiuotujuARpl0QvxriWI",
  authDomain: "authtest-6042b.firebaseapp.com",
  projectId: "authtest-6042b",
  storageBucket: "authtest-6042b.appspot.com",
  messagingSenderId: "220197067874",
  appId: "1:220197067874:web:0e3f69b7ef7589961bc53b"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore()

export const createUserDocument = (user, data) => {
  
  if (!user) {
    return
  }
  
  const userRef = firestore.doc(`users/${user.localId}`)
  const snapshot = userRef.get()
  
  if (!snapshot.exists) {
    const namemare = data.namemare
    
    try {
      userRef.set({
        namemare:namemare
      })
    } catch (error) {
      console.log("error creating user", error)
    }
  }
}


export default firebase