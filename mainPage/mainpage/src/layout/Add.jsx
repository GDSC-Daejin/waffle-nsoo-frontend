import React from "react";
import { collection, addDoc } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const db = getFirestore(app);
const handle = async () => {
  try {
    const docRef = await addDoc(collection(db, "kbo_stadium_info"), {
      name: "SSG 랜더스필드",
      id: 123,
    });
    addDoc(collection(db, "kbo_stadium_info"), {
      name: "nc 다이노스파크",
      id: 124,
    });
    addDoc(collection(db, "kbo_stadium_info"), {
      name: "대전 이글스파크",
      id: 125,
    });
    addDoc(collection(db, "kbo_stadium_info"), {
      name: "고척 스카이돔",
      id: 126,
    });
    addDoc(collection(db, "kbo_stadium_info"), {
      name: "광주 챔피언스 필드",
      id: 127,
    });
    addDoc(collection(db, "kbo_stadium_info"), {
      name: "잠실 야구장",
      id: 128,
    });
    addDoc(collection(db, "kbo_stadium_info"), {
      name: "사직 야구장",
      id: 129,
    });
    addDoc(collection(db, "kbo_stadium_info"), {
      name: "수원 kt_wiz파크",
      id: 120,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default function Add() {
  return (
    <div>
      <button onClick={handle}>ㄴㄴ</button>
    </div>
  );
}
