import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

if (environment.production) {
  enableProdMode();
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWBI3R3tUB6GiwHDbBrH9-FGSN0pfV4eg",
  authDomain: "foodpetm.firebaseapp.com",
  projectId: "foodpetm",
  storageBucket: "foodpetm.appspot.com",
  messagingSenderId: "933016131439",
  appId: "1:933016131439:web:1ee1befedbe2136221fa9a",
  measurementId: "G-R2R5340D71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);