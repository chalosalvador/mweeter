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
  limit,
  deleteDoc,
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
  subscribeFeedFromUsers: (users, callback) => {
    const feed = query(
      collectionGroup(db, "mweets"),
      where("uid", "in", users),
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
  removeFollow: (uid, uidUnfollow) => {
    const collectionFollows = collection(db, "users", uid, "follows");
    return deleteDoc(doc(collectionFollows, uidUnfollow));
  },
  subscribeFollows: (displayName, callback) => {
    const follows = query(collection(db, "users", displayName, "follows"));
    return onSnapshot(follows, callback);
  },
  subscribeRecommendations: (excludeUsers, callback) => {
    const recommendations = query(
      usersRef,
      where("displayName", "not-in", excludeUsers),
      limit(20)
    );
    return onSnapshot(recommendations, callback);
  },
};
