import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD6OJBWCE0g7bfTGPSl66bI9iFe-7bxzbE",
    authDomain: "themanagementsite-98085.firebaseapp.com",
    projectId: "themanagementsite-98085",
    storageBucket: "themanagementsite-98085.appspot.com",
    messagingSenderId: "711693426596",
    appId: "1:711693426596:web:9693ac769991c799c7eb31"
  };

  //initializez conectiunea la firebase
  firebase.initializeApp(firebaseConfig);

  //initializez serviciile pe care le voi folosi(autentificare,cloud si baza de date)
  const projectFirestore = firebase.firestore();
  const projectAuth=firebase.auth();
  const projectStorage=firebase.storage();

  //Obiect ce se ocupa cu convertirea milisecundelor intr-un format de month/day/year
  const timestamp=firebase.firestore.Timestamp;

  export {projectAuth,projectFirestore,projectStorage,timestamp}