import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgdzLRTj3-m3LswBqQ8IrpbYtK8WkjnDk",
  authDomain: "twitter--gamil.firebaseapp.com",
  projectId: "twitter--gamil",
  storageBucket: "twitter--gamil.appspot.com",
  messagingSenderId: "358947506466",
  appId: "1:358947506466:web:7801f7c8225ab2bd683d7b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const twitterProvider = new OAuthProvider("twitter.com");
export const microsoftProvider = new OAuthProvider("microsoft.com");

export default app;
