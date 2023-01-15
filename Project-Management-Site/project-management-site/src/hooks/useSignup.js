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
            ///signup user
            const response=await projectAuth.createUserWithEmailAndPassword(email,password);

            if(!response)
            {
                throw new Error("Could not complete signup");
            }

            //upload user thumbnail
            const uploadPath=`thumbnails/${response.user.uid}/${thumbnail.name}`;
            const image=await projectStorage.ref(uploadPath).put(thumbnail);
            const imageUrl=await image.ref.getDownloadURL();

            ///add username to user
            await response.user.updateProfile({displayName:username,photoURL:imageUrl})

            //create a user document
            await projectFirestore.collection("users").doc(response.user.uid).set({
                online:true,
                username,
                photoURL:imageUrl
            })


            //dispatch login function
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
            setError(err.message);
            setIsPending(false);
            }
        }
    }

    useEffect(()=>{
        setIsCancelled(false);
        return ()=>setIsCancelled(true);
    },[])

    return {error,isPending,signup}

}