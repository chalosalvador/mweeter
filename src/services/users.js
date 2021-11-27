import {
  setDoc,
  doc,
  collection,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./index";

const usersRef = collection(db, "users");

export const User = {
  save: (uid, data) => setDoc(doc(usersRef, uid), data),
  get: (uid) => getDoc(doc(usersRef, uid)),
  subscribe: (uid, handle) => onSnapshot(doc(usersRef, uid), handle),
};
