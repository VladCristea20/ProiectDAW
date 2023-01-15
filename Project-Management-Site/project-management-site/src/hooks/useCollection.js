import { useEffect, useRef, useState } from "react";
import { projectFirestore } from '../firebase/config';
export const useCollection = (collection,_query,_orderBy) => {
    const [documents, setDocuments] = useState(null);/**fiecare state are un fel de functie(asemanatoare cu proprietatiile din C#) , de obicei notata cu set in fata denumirii care updateaza valoarea */
    const [error, setError] = useState(null);

    const query=useRef(_query).current;///referinta array-ului se va modifica la fiecare reevaluare de pagina indiferent daca datele din array s-au modificat sau nu
    ///hook-ul de useRef previne acest lucru prin faptul ca se uita dupa valorile din array si nu dupa referinta in functia de useEffect
    const orderBy=useRef(_orderBy).current;
    useEffect(() => {
        let ref = projectFirestore.collection(collection);
        if(query)
        {
            ref=ref.where(...query);//filtrez datele in functie de cum a fost apelata metoda de useCollection
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
            //updatatez state-ul(variabila ce se uita dupa modificari) de documents la rezultat si de eroare la null
            setDocuments(results);
            setError(null)
        }, (error) => {
            console.log(error)
            setError("Could not fetch the data");
        })

        //logica pentru cand utilizatorul navigheaza de pe pagina curenta
        return () => unsubscribe();

    }, [collection,query,orderBy])

    return { documents, error }//datele ce le voi prelua odata ce s-a terminat fetch-ul
}