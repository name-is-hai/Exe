import { DocumentData,Query, QueryConstraint,addDoc,collection, onSnapshot,query } from "firebase/firestore";

import { fireStore } from "@/lib/firebase";

export const sendMessage = (path: string[], message: any) => {
    return addDoc(collection(fireStore, 'messages', ...path), message);
}

export const setQueryMessage = (path: string[], condition: QueryConstraint[]) => {
    return query(collection(fireStore, 'messages', ...path), ...condition)
}

export const unsubscribeQuery = (query: Query<DocumentData, DocumentData>) => {
    const fetchedQuery = [];
    const unsubscribe = onSnapshot(query, (QuerySnapshot) => {
        QuerySnapshot.forEach((doc) => {
            fetchedQuery.push({ ...doc.data(), id: doc.id });
        });
        return () => unsubscribe;
    })
    return fetchedQuery;
}