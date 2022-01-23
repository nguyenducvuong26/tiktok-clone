import {
    addDoc,
    collection,
    serverTimestamp,
    doc,
    updateDoc,
    query,
    where,
    orderBy,
    getDoc,
    getDocs,
    limit,
    startAfter,
    deleteDoc,
} from "firebase/firestore";
import { db } from "./config";

export const addDocument = async (collectionName, data) => {
    await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
    });
};

export const updateDocument = async (
    collectionName,
    docId,
    fieldPath,
    data
) => {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, fieldPath, data);
};

export const getSingleDocument = async (collectionName, id) => {
    try {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {
                ...docSnap.data(),
            };
        }
    } catch (error) {
        console.log(error.message);
    }
};

export const getDocumentsWithNoCondition = async (
    collectionName,
    latestDoc = null
) => {
    try {
        let q, documentSnapshots;
        if (latestDoc) {
            q = query(
                collection(db, collectionName),
                orderBy("createdAt", "desc"),
                startAfter(latestDoc),
                limit(5)
            );
        } else {
            q = query(
                collection(db, collectionName),
                orderBy("createdAt", "desc"),
                limit(5)
            );
        }
        documentSnapshots = await getDocs(q);
        return documentSnapshots;
    } catch (error) {
        console.log(error);
    }
};

export const getDocumentsWithCondition = async (
    collectionName,
    condition,
    latestDoc = null
) => {
    try {
        let queries = [];
        // handle when the condition value has more than 10 documents to query
        // for query in or not-in in an array
        // solution from: https://stackoverflow.com/questions/61354866/is-there-a-workaround-for-the-firebase-query-in-limit-to-10
        if (latestDoc) {
            for (let i = 0; i < condition.value.length; i += 10) {
                queries.push(
                    query(
                        collection(db, collectionName),
                        where(
                            condition.fieldPath,
                            condition.operator,
                            condition.value.slice(i, i + 10)
                        ),
                        orderBy(condition.orderBy, condition.sortBy),
                        startAfter(latestDoc),
                        limit(condition.limit)
                    )
                );
            }
        } else {
            for (let i = 0; i < condition.value.length; i += 10) {
                queries.push(
                    query(
                        collection(db, collectionName),
                        where(
                            condition.fieldPath,
                            condition.operator,
                            condition.value.slice(i, i + 10)
                        ),
                        orderBy(condition.orderBy, condition.sortBy),
                        limit(condition.limit)
                    )
                );
            }
        }
        let documentSnapshots = [];
        for (let i = 0; i < queries.length; i++) {
            documentSnapshots.push(getDocs(queries[i]));
        }
        documentSnapshots = await Promise.all(documentSnapshots);
        // uniqe documents in one array
        documentSnapshots = [
            ...new Set(
                [].concat(...documentSnapshots.map((snapshot) => snapshot.docs))
            ),
        ];
        // filter same object user
        const documentSnapshotIds = documentSnapshots.map(
            (document) => document.id
        );

        const filteredDocumentSnapshots = documentSnapshots.filter(
            (document, index) =>
                !documentSnapshotIds.includes(document.id, index + 1)
        );

        return filteredDocumentSnapshots;
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteDocument = async (collectionName, documentId) => {
    await deleteDoc(doc(db, collectionName, documentId));
};
