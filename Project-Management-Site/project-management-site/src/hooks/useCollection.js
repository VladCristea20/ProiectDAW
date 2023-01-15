import { useEffect, useRef, useState } from "react";
import { projectFirestore } from '../firebase/config';
export const useCollection = (collection,_query,_orderBy) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    const query=useRef(_query).current;///array refference changes every time the page is reevaluated, thus triggering the useEffect hook needlessly
    ///this is fixed by using the useRef hook and specifing that that we want the current array value and not the adress
    const orderBy=useRef(_orderBy).current;
    useEffect(() => {
        let ref = projectFirestore.collection(collection);
        if(query)
        {
            ref=ref.where(...query);
        }
        if(orderBy)
        {
            ref=ref.orderBy(...orderBy);
        }
        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })
            //update state
            setDocuments(results);
            setError(null)
        }, (error) => {
            console.log(error)
            setError("Could not fetch the data");
        })

        //unsubscribe on unmount
        return () => unsubscribe();

    }, [collection,query,orderBy])

    return { documents, error }
}