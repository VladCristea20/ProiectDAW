import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from '../firebase/config';
let initialState = {
    document: null,
    isPending: false,//cookie ce retine date legate de document
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {///modifica valorile cookie-ului
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
    const [response, dispatch] = useReducer(firestoreReducer, initialState);//in state-ul de response se updateaza cookie-ul cu ajutorul functiei de dispatch
    const [isCancelled, setIsCancelled] = useState(false);

    //fetch la endpoint dat prin argument
    const ref = projectFirestore.collection(collection);

    //verifica daca utilizatorul a navigat de pe pagina
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action);///functia de dispatch face apel la functia firestoreReducer ce modifica cookie-ul de mai sus
        }
    }

    //adaug un document in baza ded ate
    const addDocument = async (doc) => {
        dispatch({ type: "IS_PENDING" });
        //logica pentru a evita spam-ul la requestul de post
        try {
            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await ref.add({ ...doc, createdAt });
            dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument });///pasez un obiect ca si argument cu proprietati in funtia dispatchIfNotCancelled si o apelez
        }
        catch (error) {
            dispatchIfNotCancelled({ type: "ERROR", payload: error.message })
        }
    }

    const deleteDocument = async (id) => {
        dispatch({ type: "IS_PENDING" });
        try {
            await ref.doc(id).delete();
            dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
        } catch (error) {
            dispatchIfNotCancelled({ type: "ERROR", payload: "COULD NOT DELETE THE DOCUMENT" });
        }
    }
    
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
        return () => setIsCancelled(true);//logica pentru cand utilizatorul navigheaza de pe pagina unde se face fetch-ul
    }, [])

    return { addDocument, deleteDocument, updateDocument, response }

}