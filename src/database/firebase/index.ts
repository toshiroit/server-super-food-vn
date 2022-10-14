import { FirebaseOptions, initializeApp } from 'firebase/app'
import config from '../../config/config'
import firebase from 'firebase/app'
const firebaseConfig: FirebaseOptions = {
  apiKey: config.firebase_apiKey,
  authDomain: config.firebase_authDomain,
  databaseURL: config.firebase_databaseURL,
  projectId: config.firebase_projectId,
  storageBucket: config.firebase_storageBucket,
  messagingSenderId: config.firebase_messagingSenderId,
  appId: config.firebase_appId,
  measurementId: config.firebase_measurementId
}
export const app = firebase.initializeApp(firebaseConfig)


