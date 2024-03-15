import { Link, Navigate } from "react-router-dom";
import Register from './Register';
import {useContext, useState} from "react";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] =  useState(false);
    
    const {setUser} = useContext(UserContext);

    async function login(ev){
        ev.preventDefault();
        const userInfo = await axios.post('/login', {
            username,
            password
        })
        setUser(userInfo)
        setRedirect(true);
    }

    if (redirect){
        return <Navigate to={'/'} />
    }

    return(
        <div className="flex grow justfiy-round items-center mb-32">
            <div className="flex flex-col grow text-center">
                <h1 className="text-4xl text-center font-bold">Login</h1>
                <form className="mx-auto text-center mt-3" onSubmit={login}>
                    <input type="text" 
                        value={username} 
                        placeholder="username" 
                        className="p-4"
                        onChange={e=>setUsername(e.target.value)}
                        />
                    <input 
                        type="password" 
                        value={password} 
                        placeholder="your password" 
                        onChange={e => setPassword(e.target.value)}
                        className="p-4"/>
                    <button className="primary">Login</button>
                </form>

                <p className="mt-4 text-gray-500">Don't have an account yet? <span className="mx-1"></span>
                    <Link className="underline text-black font-bold" to={"/register"}> Register now!</Link></p>
           </div>
        </div>
    )
}