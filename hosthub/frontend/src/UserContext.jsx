import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import {data} from "autoprefixer"
import { Navigate } from "react-router-dom";


export const UserContext = createContext({})

export function UserContextProvider({children}){
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)
    const [isHost, setIsHost] = useState(false);
    // const [tokenExpiry, setTokenExpiry] = useState("");

    useEffect(() => {
        if (!user) {
            try {
                axios.get("/profile").then(({data})=>{
                    if (data !== 'no user'){
                        setUser(data)
                        setReady(true)
                    }
    
                    if (data.hostId != undefined){
                        setIsHost(true) 
                    }
                })
    
                // axios.get("/checkTokenExpiry").then(({data})=>{
                //     setTokenExpiry(data)
                //     console.log(data)
                // })  
            } catch(e){
                console.error(e)
                return e;
            }

        }

    },[])

    return (
        <UserContext.Provider value = {{user, setUser,ready,isHost,setIsHost, setReady}}>
            {children}
        </UserContext.Provider>
    )
}