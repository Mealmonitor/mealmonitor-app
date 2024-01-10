import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBxylx6GGeFHyONpVIwA8kKiwwnsnfKvRY',
  authDomain: 'mealmonitor-auth.firebaseapp.com',
  projectId: 'mealmonitor-auth',
  storageBucket: 'mealmonitor-auth.appspot.com',
  messagingSenderId: '221270853911',
  appId: '1:221270853911:web:5663cc2ce95db255e40f52',
  measurementId: 'G-PSNZJMRP50',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export {db, app, auth};
