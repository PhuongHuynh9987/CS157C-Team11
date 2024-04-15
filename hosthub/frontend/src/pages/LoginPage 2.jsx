import { Link, Navigate } from "react-router-dom"; 
import {useContext, useState} from "react";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] =  useState(false);
    const [wrongPassword, setWrongPassword] =  useState(false);
    const [noUser, setNoUser] =  useState(false);
    const {setUser,setIsHost} = useContext(UserContext);

    async function login(ev){
        ev.preventDefault();
        try {
            const userInfo = await axios.post('/login', {
                username,
                password
            })
            if (userInfo.data == "wrong password"){
                setWrongPassword(true);
             
            }
            else if (userInfo.data == "user not found"){
                setNoUser(true)
            }
            else { 
                setUser(userInfo.data)
                if (userInfo.data.hostId != undefined){
                    setIsHost(true) 
                }
                setRedirect(true);
            }
        } catch(e){
            console.log(e);
        }
     
    }

    function removeWarning() {
        setWrongPassword(false);
        setNoUser(false)
    }

    if (redirect){
        return <Navigate to={'/'} />
    }


    return(
        <div className="h-screen flex grow justfiy-round items-center">
            <div className="flex flex-col grow text-center">
                
                <h1 className="text-4xl text-center font-bold">Login</h1>
                { (wrongPassword || noUser) && (
                    <h2 className="text-red-400 font-semibold mt-3">Wrong username or password!!</h2>
                )}
                    
                <form className="mx-auto text-center mt-3" onSubmit={login}>
                    <input type="text" 
                        value={username} 
                        placeholder="username" 
                        className="p-4"
                        onChange={e=>setUsername(e.target.value)}
                        onClick={removeWarning}
                        />
                    <input 
                        type="password" 
                        value={password} 
                        placeholder="your password" 
                        onChange={e => setPassword(e.target.value)}
                        onClick={removeWarning}
                        className="p-4"/>
                    <button className="primary">Login</button>
                </form>

                <p className="mt-4 text-gray-500">Don't have an account yet? <span className="mx-1"></span>
                    <Link className="underline text-black font-bold" to={"/register"}> Register now!</Link></p>
           </div>
        </div>
    )
}