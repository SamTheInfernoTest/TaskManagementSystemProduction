import { createContext, useContext, useState } from "react";

const userContext = createContext();

export function UserContextProvider({ children }) {

    const [userName, setUserName] = useState('null')

    return (
        <userContext.Provider value={{userName, setUserName}}>
            {children}
        </userContext.Provider>
    )
}

export default function useUser(){
    return useContext(userContext)
}