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

            //dispatch logout action
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
    // setIsCancelled(false);
    useEffect(()=>{
        setIsCancelled(false);
        return ()=>setIsCancelled(true);//return only fires when component is unmounted
    },[])
    // console.log(isPending);
    return {login,error,isPending}
}