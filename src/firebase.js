import app from 'firebase/app';
import 'firebase/auth';

let config = {
  apiKey: "AIzaSyBrNbiTMY81-Y3HxU59NTjWASBSdfFhqLM",
  authDomain: "shopped-backend.firebaseapp.com",
  databaseURL: "https://shopped-backend.firebaseio.com",
  projectId: "shopped-backend",
  storageBucket: "shopped-backend.appspot.com",
  messagingSenderId: "576035815829"
  };

app.initializeApp(config)

export default app