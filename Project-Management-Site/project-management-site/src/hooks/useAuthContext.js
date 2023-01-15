import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error("useAuthContext must be inside an AuthContextProvider"); //logica ce se ocupa cu validarea componentei in care se vor da fetch la cookie-uri(doar cele nested in provider)
    }
    return context;//cookie-urile siteului web

}