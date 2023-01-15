import { useEffect, useState } from "react";
import { projectAuth,projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
export const useLogin=()=>{
    const [isCancelled,setIsCancelled]=useState(false);
    const [error,setError]=useState(null);
    const [isPending,setIsPending]=useState(false);
    const {dispatch} = useAuthContext();
    const login = async(email,password)=>{
        setError(null);
        setIsPending(true);

        try{
            const response=await projectAuth.signInWithEmailAndPassword(email,password);
            await projectFirestore.collection("users").doc(response.user.uid).update({online:true});

            //updatez cookie-ul ce retine informatii legate de utilizatorul ce incearca sa isi dea login
            dispatch({type:"LOGIN",payload:response.user});

            //update state
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
        return ()=>setIsCancelled(true);//logica pentru cand utilizatorul navigheaza de pe pagina in mijlocul requestului de login
    },[])

    return {login,error,isPending}//date ce vor fi deserializate
}