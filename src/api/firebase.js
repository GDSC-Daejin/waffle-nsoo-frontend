import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";


const firebaseConfig = { // process.env.REACT_APP ~~~
  apiKey: "AIzaSyBA2A7s7dOT6ODqwG8hPtPRxEV11eOqqpM",
  authDomain: "study-4491e.firebaseapp.com",
  databaseURL: "https://study-4491e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "study-4491e",
};


const app = initializeApp(firebaseConfig);
// const auth = getAuth();
const provider = new GoogleAuthProvider;


// 구글 로그인시 동작하는 함수
export async function login() {
    return signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        return user;
      })
      .catch(console.error);
}

// 로그아웃시 동작하는 함수. 
export async function logout() {
  return signOut().then(() => null);
}

export const auth = getAuth(app);


