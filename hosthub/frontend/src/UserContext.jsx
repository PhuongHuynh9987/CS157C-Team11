import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import {data} from "autoprefixer"
import { Navigate } from "react-router-dom";


export const UserContext = createContext({})

export function UserContextProvider({children}){
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)
    const [isHost, setIsHost] = useState(false);

    useEffect(() => {
        if (!user) {
            axios.get("/profile").then(({data})=>{
                if (data !== 'no user'){
                    setUser(data)
                    setReady(true)
                }

                if (data.hostId != undefined){
                    setIsHost(true) 
                    // console.log(isHost)
                }
            })    
        }
    },[])

    return (
        <UserContext.Provider value = {{user, setUser,ready,isHost,setIsHost}}>
            {children}
        </UserContext.Provider>
    )
}