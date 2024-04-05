import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import {data} from "autoprefixer"
import { Link, Navigate, useParams } from "react-router-dom";

export const UserContext = createContext({})

export function UserContextProvider({children}){
    const [user, setUser] = useState(null)
    console.log("before")
    console.log(user)

    useEffect(() => {
        if (!user) {
            axios.get("/profile").then(({data})=>{
                setUser(data)
            })    
        }
    },[])
    console.log("after")
    console.log(user)
    return (
        <UserContext.Provider value = {{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}