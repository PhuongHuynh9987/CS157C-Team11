import { Link } from "react-router-dom";
import img from "./assets/HostHub.png";
import { useContext, useEffect, useRef, useState } from "react";
import Multiselect from 'multiselect-react-dropdown';
import { UserContext } from "./UserContext";
import axios from "axios";


export default function Header(){
  const [showList, setShowList] = useState(false);
  const [redirect, setRedirect] = useState('')
  const {user,setUser,setIsHost} = useContext(UserContext)

  const showDone = () => {
    if(showList === false) setShowList(true);
    else setShowList(false);
  }
  const screen = useRef(null);
  useEffect(()=>{
    document.addEventListener("mousedown", outsideClick)
  })

  const outsideClick=(e) => {
    if(screen.current && !screen.current.contains(e.target)){
      setShowList(false);
    }
  }

  function removeToggle(){
    if (showList === true) setShowList(false);
  }

  async function logout(){
    await axios.post("/logout");
    setUser(null)
    setIsHost(false)
    setRedirect('/')
  }

    return (
        <div className="h-28" ref ={screen} onClick={removeToggle}>
          <header className="flex items-center justify-between gap-6 mx-4" >
              <div className="flex items-center justify-center">
              <Link to= {"/"} className="flex gap-1 items-center">   
                <div onClick={removeToggle}>
                  <img className="object-cover w-44" src={img} />
                </div>
              </Link> 
            </div>
            <div className="border border-2 border-blue-100 shadow-xl w-full rounded-full flex items-center justify-round gap-5">
              {/* <input className="shadow-xl lg:w-11/12 md:w-10/12 sm:w-9/12 rounded-l-full p-4" type="text" placeholder="search for a host" > */}
              <form className="flex gap-1 justify-start text-left w-full m-0">
                <input type="date"/>
                <input type="date"/>
                <div className="w-full">
                  <Multiselect isObject={false} placeholder="any"  
                            className="multiselect "
                            options={["Airport Pickup",
                                    'Airport Dropoff',
                                    'Kitchen Access',
                                    'Groceries provided']} 
                        showCheckbox  />   
                </div> 
            </form>
              <div className="flex border border-2 border-yellow-300 rounded-full items-center mr-4">
                <button className="primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </button>
              </div>
            </div>
       
               {/*  */}

        <div className="w-auto">
            <button onClick={showDone} className="flex items-center justify-center rounded-3xl w-full h-12 border border-2 gap-2 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-yellow-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-yellow-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
            {user && (
              <div className="">
                <h1 className="font-semibold text-blue-400">{user.firstName}</h1>
              </div>
            )}
            </button>
          </div>      
        </header>

        <div className="relative bottom-3 mr-3">
          {!user && showList &&  (
            <div className="flex justify-end flow font-medium font-mono">
              <div className="bg-blue-100 p-4 w-60 rounded-xl flex flex-col gap-5" id = "clicked">
                  <Link to="/login" onClick={removeToggle}><h2>Login </h2></Link>
                  <Link to="/register" onClick={removeToggle}><h2>Register</h2></Link>
                  <Link to="/login" onClick={removeToggle}><h2>Want to host others?</h2></Link>
              </div>  
            </div>
          )}
        </div>

        <div className="relative bottom-3 mr-3">
          {user && showList &&  (
            <div className="flex justify-end flow font-medium font-mono">
              <div className="bg-blue-100 p-4 w-60 rounded-xl flex flex-col gap-5" id = "clicked">
                <Link to="/account/profile" onClick={removeToggle}><h2>Account</h2></Link>
                <Link to="/" onClick={removeToggle}><h2>Home</h2></Link>
                <Link onClick={logout} ><h2>Logout </h2></Link>    
              </div>  
            </div>
          )}
        </div>        

    </div>

    
    )
}  


{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>   */}