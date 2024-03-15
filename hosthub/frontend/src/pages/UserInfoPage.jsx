import { React, useState,useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

export default function UserInfoPage(){
    const {user} = useContext(UserContext);
    
    if (!user){
        return <Navigate to = {'/login'} />
    }
    

    return (
        <div>
            hello {user.data}
            
        </div>
    )
}