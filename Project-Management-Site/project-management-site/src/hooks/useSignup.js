import { useEffect,useState } from "react"
import { projectAuth,projectStorage,projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [isCancelled,setIsCancelled]=useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const {dispatch}=useAuthContext();

    const signup = async (email, password, username,thumbnail) => {
        setError(null);
        setIsPending(true);

        try{
            ///inregistrez un utilizator in baza de date
            const response=await projectAuth.createUserWithEmailAndPassword(email,password);

            if(!response)
            {
                throw new Error("Could not complete signup");
            }

            //adaug fotografia aleasa de utilizator in cloud
            const uploadPath=`thumbnails/${response.user.uid}/${thumbnail.name}`;
            const image=await projectStorage.ref(uploadPath).put(thumbnail);
            const imageUrl=await image.ref.getDownloadURL();

            ///updatez informatiile userului ce doresc sa il creez
            await response.user.updateProfile({displayName:username,photoURL:imageUrl})

            //adaug obiectul creat in baza de date
            await projectFirestore.collection("users").doc(response.user.uid).set({
                online:true,
                username,
                photoURL:imageUrl
            })


            //inregistrez informatiile userului intr-un cookie
            dispatch({type:"LOGIN",payload:response.user})
            if(!isCancelled)
            {
            setIsPending(false);
            setError(null);
            }
        }
        catch(err)
        {
            if(!isCancelled)
            {
            console.log(err.message);
            setError(err.message);//tratarea de exceptii
            setIsPending(false);
            }
        }
    }

    useEffect(()=>{
        setIsCancelled(false);
        return ()=>setIsCancelled(true);
    },[])

    return {error,isPending,signup}//date ce vor fi deserializate

}