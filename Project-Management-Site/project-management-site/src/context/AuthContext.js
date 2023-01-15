import { createContext,useEffect,useReducer } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext=createContext()

export const authReducer =(state,action)=>{
    switch(action.type)
    {
        case "LOGIN":
            return {...state,user:action.payload}
        case "LOGOUT":
            return{...state,user:null}
        case "AUTH_IS_READY":
            return {...state,user:action.payload,authIsReady:true}
        default:
            return state;
    }
}

export const AuthContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(authReducer,{
        user:null,//cookie-urile website-ului(informatiile userului)
        authIsReady:false
    })
    useEffect(()=>{
        const unsub=projectAuth.onAuthStateChanged((user)=>{
            dispatch({type:"AUTH_IS_READY",payload:user});
            unsub()//updateaza cookie-ul authIsReady pentru a putea decide daca se pot incarca restul componentelor pe pagina
        })
    },[])
    console.log("AuthContext state:",state);
    return (
        <AuthContext.Provider value={{...state,dispatch}}>  {/**Logica ce paseaza date tuturor componentelor care se care sunt nested in interiorul lui AuthContext.Provider
         * (in cazul meu userul autentificat si o functie ce da trigger la reevaluarea paginii in functie de login/logout) */}
            {children}
        </AuthContext.Provider>
    )
}