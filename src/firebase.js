import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4qsFPJkZXejfeyaR6AZlZkx9lo_OIn54",
  authDomain: "seqam-lab-login.firebaseapp.com",
  projectId: "seqam-lab-login",
  appId: "1:356602734328:web:0bccb58535e64891467d0d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GithubAuthProvider();

export { auth, provider };
