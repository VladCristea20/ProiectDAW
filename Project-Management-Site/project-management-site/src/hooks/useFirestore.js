import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from '../firebase/config';
let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}
// console.log("initial state",initialState);
const firestoreReducer = (state, action) => {
    switch (action.type) {
        case "IS_PENDING":
            return { isPending: true, document: null, success: false, error: null }
        case "ADDED_DOCUMENT":
            return { isPending: false, document: action.payload, success: true, error: null }
        case "DELETED_DOCUMENT":
            return { isPending: false, document: null, success: true, error: null }
        case "UPDATED_DOCUMENT":
            return { isPending: false, document: action.payload, success: true, error: null }
        case "ERROR":
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state;
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    //collection ref
    const ref = projectFirestore.collection(collection);

    //only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action);
        }
    }

    //add a document
    const addDocument = async (doc) => {
        dispatch({ type: "IS_PENDING" });
        // console.log("Pending state",initialState);
        try {
            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await ref.add({ ...doc, createdAt });
            dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument });
        }
        catch (error) {
            dispatchIfNotCancelled({ type: "ERROR", payload: error.message })
        }
    }
    // console.log("modified initial state",initialState);

    const deleteDocument = async (id) => {
        dispatch({ type: "IS_PENDING" });
        try {
            await ref.doc(id).delete();
            dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
        } catch (error) {
            dispatchIfNotCancelled({ type: "ERROR", payload: "COULD NOT DELETE THE DOCUMENT" });
        }
    }
    // update a document
    const updateDocument = async (id, updates) => {
        dispatch({ type: "IS_PENDING" })

        try {
            const updatedDocument = await ref.doc(id).update(updates)
            dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedDocument })
            return updatedDocument
        }
        catch (error) {
            dispatchIfNotCancelled({ type: "ERROR", payload: error })
            return null
        }
    }
    useEffect(() => {
        setIsCancelled(false);
        return () => setIsCancelled(true);
    }, [])

    return { addDocument, deleteDocument, updateDocument, response }

}