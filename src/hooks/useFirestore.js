import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
    collection,
    query,
    where,
    onSnapshot,
    orderBy,
} from "firebase/firestore";
import { formatDate } from "../utilities/formatDate";

const useFirestore = (collectionName, condition) => {
    const [documents, setDocuments] = useState([]);

    // Listen to realtime update data
    useEffect(() => {
        let q, unsubscribe;
        if (!condition.fieldPath || !condition.operator || !condition.value) {
            q = query(
                collection(db, collectionName),
                orderBy("createdAt", condition.sortBy)
            );
        } else {
            q = query(
                collection(db, collectionName),
                where(condition.fieldPath, condition.operator, condition.value),
                orderBy("createdAt", condition.sortBy)
            );
        }
        // Listen to collection to get realtime updates
        unsubscribe = onSnapshot(q, (querySnapshot) => {
            // to give a document a timestamp, then onSnaphot will fire twice.
            // This seem to be because when you add a new document to your database onSnapshot will fire,
            // but the serverTimestamp has not run yet. After a few milliseconds serverTimestamp will run and update you document
            // => onSnapshot will fire again.
            // More: https://stackoverflow.com/questions/49972173/firestore-onsnapshot-executing-twice
            // if (!querySnapshot.metadata.hasPendingWrites) {
            const documents = querySnapshot.docs
                .map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                .map((doc) => ({
                    ...doc,
                    createdAt: formatDate(doc.createdAt?.seconds),
                }));
            setDocuments(documents);
            // }
        });
        return () => {
            unsubscribe();
        };
    }, [collectionName, condition]);

    return documents;
};

export default useFirestore;
