import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function Register(){
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState('');
    const [emptyField, setEmptyField] = useState('')

    async function registerUser(ev){
        ev.preventDefault();
       
        if (username === '' || firstName === '' ||email === '' || password === '') {
            setEmptyField(false)
        }
            
        else {
            await axios.post('/register', {
                username,
                firstName,
                lastName,
                email,
                password
            })
            setRedirect(true);
        }
    }

    if (redirect){
        return <Navigate to={'/login'} />
    }


    return(
        <div className="h-screen flex grow justfiy-round items-center">
            <div className="flex flex-col grow text-center">
                
                <h1 className="text-4xl text-center font-bold">Register</h1>
                {!emptyField && (
                    <h3 className="text-red-600 my-3 font-semibold">Please fill every field!!</h3>
                )}
                <form className="max-w-lg mx-auto text-center mt-3" onMouseDown={e=>setEmptyField(true)} onSubmit={registerUser}>
                    <input type="text" placeholder="First Name" 
                            value = {firstName}
                            onChange={ev => setFirstName(ev.target.value)}
                            className="p-4"/>
                    <input type="text" placeholder="Last Name" 
                            value = {lastName}
                            onChange={ev => setLastName(ev.target.value)}
                            className="p-4"/>
                    <input type="text" placeholder="username" 
                            value = {username}
                            onChange={ev => setUsername(ev.target.value)}
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