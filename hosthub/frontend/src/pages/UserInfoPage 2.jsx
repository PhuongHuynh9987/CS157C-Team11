import { React, useState,useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";


export default function UserInfoPage(){
    const {user} = useContext(UserContext);
    const [isHost, setIsHost] = useState(false);
    
    console.log(user)
    if (!user){
        return <Navigate to = {'/login'} />
    }

    let {subpage} = useParams();
    if (subpage === undefined){
        subpage = 'profile'
    }

    function linkClass(type=null){
        let classes= 'py-2 px-4'
        if (type === subpage) {
            classes += " bg-yellow-300 rounded-full"
        }

        else {
            classes += " bg-gray-100 rounded-full"
        }
        return classes
    }

    return (
        <div className="mx-20 mt-12">
             <nav className="w-full flex mb-10 gap-6 justify-center font-semibold text-blue-600">
                <Link className={linkClass('profile')} to={'/account/profile'}>My profile</Link>
                {isHost && (
                <Link className={linkClass('hostingInfo')} to={'/account/hostingInfo'}>My hosting information</Link>
                )}
            </nav>
            <div className="grid grid-cols-[35%_65%] gap-10 text-center h-screen mb-36">
                <div className="grid grid-rows-[35%_65%] gap-4">
                  
                    <div className="shadow-2xl p-4 rounded-xl">
                        <h2 className="font-bold text-2xl text-blue-500">Phuong Huynh</h2>
                        <div className="flex justify-center mt-5">
                            <img className="aspect-square object-cover rounded-full w-48" src="https://expertphotography.b-cdn.net/wp-content/uploads/2018/10/cool-profile-pictures-retouching-1.jpg" alt="" />
                        </div>
                    </div>

                    <div className="shadow-2xl p-4 rounded-xl flex flex-col justify-between mb-4">
                        <div>
                            <h2 className="font-bold text-2xl text-blue-500">About me</h2>
                            <p className="text-left mt-4">Lorem ipsum, dolor sit amet 
                                consectetur adipisicing elit. Corporis quasi, 
                                praesentium pariatur ipsa cumque culpa placeat! Itaque, 
                                temporibus praesentium? Veritatis illo laborum ab minus 
                                eum nesciunt ducimus magni aut officia!</p>
                        </div>
                        {!isHost && (
                            <Link to={'/hostSignup'}><h2 className="underline font-bold">Want to host others?</h2></Link>
                        )}
                    </div>

                </div>

                <div className="shadow-2xl p-4 rounded-xl">
                    <h2 className="font-bold text-2xl mb-2 text-blue-500">Stay history</h2>
                    <hr className="mx-auto bg-gray-200 border-0 rounded"/>

                    <div className="text-left p-5 rounded-xl">
                        <h1 className="text-xl font-bold">Uncle Bob' place</h1>
                        <div className="flex gap-5 my-5">
                            <img className="w-1/4 rounded-xl aspect-square object-cover" src="https://www.smartbrief.com/wp-content/uploads/2020/09/pexels-august-de-richelieu-4259140-scaled.jpg" alt="" />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore neque nesciunt distinctio dolorem, fugiat corrupti eius! Consequuntur nostrum natus sapiente nam et! Cumque excepturi expedita earum atque officia qui asperiores.</p>
                        </div>
                        <hr className="mx-auto my-4 bg-gray-200 border-0 rounded"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

{/* <div className="grid justify-center mt-10">
            <div className="grid grid-cols-2 mt-20 mb-8 gap-9">
                <div className="p-14 shadow-2xl rounded-xl  text-blue-500 bg-yellow-200">
                    <div className="flex gap-4">
                        <h2 className="text-l font-bold">Personal Info</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                        </svg>
                    </div>
                    
                    <p className="text-blue-500 mt-4">Provide or modify personal info</p>
                </div>

                <div className="p-14 shadow-2xl rounded-xl  text-blue-500 bg-yellow-200">
                    <div className="flex gap-4">
                        <h2 className="text-l font-bold">Login & Security</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                        </svg>
                    </div>
                </div>

                <div className="p-14 shadow-2xl rounded-xl  text-blue-500 bg-yellow-200">
                    <div className="flex gap-4">
                        <h2 className="text-l font-bold">Payment Methods</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                        </svg>
                    </div>
                </div>

                <div className="p-14 shadow-2xl rounded-xl  text-blue-500 bg-yellow-200">
                    <div className="flex gap-4">
                        <h2 className="text-l font-bold">Privacy and Sharing</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="p-14 shadow-2xl rounded-xl  text-blue-500 bg-yellow-200">
                <div className="flex gap-4">
                    <h2 className="text-l font-bold">Your hosting information</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                    </svg>

                </div>
            </div>
        </div> */}