import {
    DocumentData, DocumentReference, DocumentSnapshot, Query, QueryConstraint, QueryDocumentSnapshot, QuerySnapshot, addDoc, collection, doc, getDoc, onSnapshot, query, serverTimestamp, setDoc, updateDoc
} from "firebase/firestore";

import { fireStore } from "@/lib/firebase";
import { QueryChatsResp, UserMessage } from "@/types";

export const getDocsChats = (path: string[]) => {
    return getDoc(doc(fireStore, "chats", ...path));
}
export const setDocsChats = (path: string[], message: any) => {
    return setDoc(doc(fireStore, "chats", ...path), message);
}

export const setDocsUserChats = (path: string[], message: any) => {
    return setDoc(doc(fireStore, "userChats", ...path), message);
}

export const updateDocsMessage = (combinedId: string, sendUser: UserMessage, recivedUser: UserMessage) => {
    return updateDoc(doc(fireStore, "userChats", sendUser.uid), {
        [combinedId + ".userInfo"]: {
            uid: recivedUser.uid,
            name: recivedUser.name,
            avatar: recivedUser.avatar,
        },
        [combinedId + ".date"]: serverTimestamp(),
    });
}

export const sendDocMessage = (path: string[], message: any) => {
    return addDoc(collection(fireStore, 'chats', ...path), message);
}

export const setQueryUserChats = (path: string[]) => {
    return doc(fireStore, 'userChats', ...path)
}

export const setQueryChats = (path: string[], condition?: QueryConstraint[]) => {
    return condition ? query(collection(fireStore, 'chats', ...path), ...condition) : query(collection(fireStore, 'chats', ...path))
}

export const subscribeToQueryUserChats = (query: DocumentReference<DocumentData, DocumentData>, callback: (data: QueryChatsResp[]) => void) => {
    const unsubscribe = onSnapshot(query, (snapshot: DocumentSnapshot<DocumentData, DocumentData>) => {
        const fetchedQuery: QueryChatsResp[] = [];

        if (snapshot.exists()) {
            const data = snapshot.data();
            const chatEntries = Object.entries(data);
            chatEntries.sort((a: any, b: any) => b[1].date - a[1].date);
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

export const subscribeToQueryChats = (query: Query<DocumentData, DocumentData>, callback: (data: any[]) => void) => {
    const unsubscribe = onSnapshot(query, (snapshot: QuerySnapshot<DocumentData>) => {
        const fetchedQuery: any[] = [];
        snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            fetchedQuery.push({ ...doc.data(), id: doc.id });
        });
        callback(fetchedQuery);
    });

    return unsubscribe;
};