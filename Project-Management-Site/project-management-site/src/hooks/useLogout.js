import { useEffect, useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
export const useLogout=()=>{
    const [isCancelled,setIsCancelled]=useState(false);
    const [error,setError]=useState(null);
    const [isPending,setIsPending]=useState(false);
    const {dispatch,user} = useAuthContext();
    const logout = async()=>{
        setError(null);
        setIsPending(true);

        try{

            const {uid}=user;
            await projectFirestore.collection("users").doc(uid).update({online:false});

            await projectAuth.signOut();

            //sterg informatiile din cookie-ul utilizatorului ce a fost logat pana cand a apasat pe butonul de logout
            dispatch({type:"LOGOUT"});

            
            if(!isCancelled)
            {
                setIsPending(false);
                setError(null);
            }
        }
        catch(error){
            if(!isCancelled)
            {
            console.log(error.message);
            setError(error.message);
            setIsPending(false);
            }
        }
    }
    useEffect(()=>{
        setIsCancelled(false);
        return ()=>setIsCancelled(true);//logica pentru cand utilizatorul navigheaza de pe pagina in mijlocului unui fetch de date
    },[])
    return {logout,error,isPending}
}