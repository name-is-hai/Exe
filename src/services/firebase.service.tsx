import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { fireStore } from '@/lib/firebase';
import { QueryChatsResp } from '@/types';

export const getDocsChats = (path: string[]) => {
  return getDoc(doc(fireStore, 'chats', ...path));
};
export const setDocsChats = (path: string[], message: any) => {
  return setDoc(doc(fireStore, 'chats', ...path), message);
};

export const setDocsUserChats = (path: string[], message: any) => {
  return setDoc(doc(fireStore, 'userChats', ...path), message);
};

export const updateDocsUserChats = (combinedId: string, path: string, message: any) => {
  return updateDoc(doc(fireStore, 'userChats', path), message);
};

export const sendDocMessage = (path: string[], message: object) => {
  return updateDoc(doc(fireStore, 'chats', ...path), { message: arrayUnion(message) });
};

export const setQueryUserChats = (path: string[]) => {
  return doc(fireStore, 'userChats', ...path);
};

export const subscribeToQueryUserChats = (
  query: DocumentReference<DocumentData, DocumentData>,
  callback: (data: QueryChatsResp[]) => void
) => {
  const unsubscribe = onSnapshot(query, (snapshot: DocumentSnapshot<DocumentData, DocumentData>) => {
    const fetchedQuery: QueryChatsResp[] = [];

    if (snapshot.exists()) {
      const data = snapshot.data();
      const chatEntries = Object.entries(data);
      chatEntries.sort((a: unknown, b: unknown) => b[1].date - a[1].date);
      const sortedChats = chatEntries.map((chat: [string, any]) => ({
        id: chat[0],
        ...chat[1],
      }));
      fetchedQuery.push(...sortedChats);
    }
    callback(fetchedQuery);
  });
  return unsubscribe;
};

export const setQueryChats = (path: string[]) => {
  return doc(fireStore, 'chats', ...path);
};

export const subscribeToQueryChats = (
  query: DocumentReference<DocumentData, DocumentData>,
  callback: (data: DocumentData) => void
) => {
  const unsubscribe = onSnapshot(query, (snapshot: DocumentSnapshot<DocumentData, DocumentData>) => {
    callback(snapshot.data());
  });
  return unsubscribe;
};
