import { initializeApp } from "firebase/app";
import { getStorage } from "firabase/app";
import { ref } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDgZAv9EKxtCLyPPYQy-naEtNxgHaj4BFA",
  authDomain: "post-it-up.firebaseapp.com",
  databaseURL: "https://post-it-up-default-rtdb.firebaseio.com",
  projectId: "post-it-up",
  storageBucket: "post-it-up.appspot.com",
  messagingSenderId: "451637369491",
  appId: "1:451637369491:web:8b1f46cf4b2cb1808bcb66",
};

const app = initializeApp(firebaseConfig);
