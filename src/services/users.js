import {
  setDoc,
  doc,
  collection,
  getDoc,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  collectionGroup,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "./index";

const usersRef = collection(db, "users");

export const User = {
  save: (uid, data) => setDoc(doc(usersRef, uid), data),
  get: (uid) => getDoc(doc(usersRef, uid)),
  getSome: (displayNames) => {
    const q = query(usersRef, where("displayName", "in", displayNames));

    return getDocs(q);
  },
  subscribe: (uid, handle) => onSnapshot(doc(usersRef, uid), handle),
  addMweet: (uid, text) =>
    addDoc(collection(db, "users", uid, "mweets"), {
      text,
      uid,
      createdAt: serverTimestamp(),
    }),
  subscribeFeed: (callback) => {
    const feed = query(
      collectionGroup(db, "mweets"),
      where("uid", "in", ["chalosalvador_menta", "claudio"]),
      orderBy("createdAt", "desc")
      // limit(20)
    );
    return onSnapshot(feed, callback);
  },
  addFollow: (uid, uidFollow) => {
    const collectionFollows = collection(db, "users", uid, "follows");
    return setDoc(doc(collectionFollows, uidFollow), {
      uid: uidFollow,
      createdAt: serverTimestamp(),
    });
  },
  subscribeFollows: (displayName, callback) => {
    const follows = query(collection(db, "users", displayName, "follows"));
    return onSnapshot(follows, callback);
  },
  // getRecommendations: () => {
  //   const recommendations = query(
  //     collectionGroup(db, "follows"),
  //     where("uid", "not-in", ["chalosalvador_menta", "claudio"]),
  //     limit(20)
  //   );
  // },
};
