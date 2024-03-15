import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
// import LoginPage from "./LoginPage";

export default function Register(){
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState('');

    async function registerUser(ev){
        ev.preventDefault();
        const data = await axios.post('/register', {
            username,
            email,
            password
        })
        setRedirect(true);
    }

    if (redirect){
        return <Navigate to={'/login'} />
    }
    
    return(
        <div className="flex grow justfiy-round items-center mb-32">
            <div className="flex flex-col grow text-center">
                <h1 className="text-4xl text-center font-bold">Register</h1>
                <form className="max-w-lg mx-auto text-center mt-3" onSubmit={registerUser}>
                    <input type="text" placeholder="username" 
                            value = {username}
                            onChange={ev => setName(ev.target.value)}
                            className="p-4"/>
                    <input type="email" placeholder="your@email.com" 
                            value = {email}
                            onChange={ev => setEmail(ev.target.value)}
                            className="p-4"/>
                    <input type="password" placeholder="your password"  
                            value = {password}
                            onChange={ev => setPassword(ev.target.value)}
                            className="p-4"/>
                    <button className="primary">Register</button>
                </form>
                <p className="mt-4 text-gray-500">Already a member? <span className="mx-1"></span>
                    <Link className="underline text-black font-bold" to={"/login"}> Login here</Link></p>
           </div>
        </div>
    )
}