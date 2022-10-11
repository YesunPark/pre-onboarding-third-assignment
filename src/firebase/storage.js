import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBvpsTJ1_dkShj72oLaMAMgJD_21cCDZkE',
  authDomain: 'pre-onboarding-third.firebaseapp.com',
  projectId: 'pre-onboarding-third',
  storageBucket: 'pre-onboarding-third.appspot.com',
  messagingSenderId: '1041333914843',
  appId: '1:1041333914843:web:2db13cc910795d615b10fe',
  measurementId: 'G-5MSH25XRLJ',
  storageBucket: 'gs://pre-onboarding-third.appspot.com',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
