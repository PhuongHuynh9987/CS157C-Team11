import { React,  useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import HostSignUp from "./HostSignup";
import EditProfile from "./EditProfile";

export default function UserInfoPage(){
    const {user,ready,isHost} = useContext(UserContext);

    if (ready && !user){
        return <Navigate to = {'/login'} />
    }
    // console.log(user)
    let {subpage} = useParams();
    if (subpage === undefined ){
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

            {subpage === 'hostingInfo' && <HostSignUp />}
            {subpage === 'editProfile' && <EditProfile />}
            {subpage === 'profile' && (
                <div className="grid grid-cols-[35%_65%] gap-10 text-center h-screen mb-36">
                <div className="grid grid-rows-[35%_65%] gap-4">
                  
                    <div className="shadow-2xl p-4 rounded-xl">
                        <h2 className="font-bold text-2xl text-blue-500">{user?.firstName} {user?.lastName}</h2>
                        <div className="flex justify-center my-5">
                            <img className="aspect-square object-cover rounded-full w-48" 
                                src ={'http://localhost:5000/uploads/'+ user?.profilePhoto}  alt="" />
                        </div>
                        <Link to ={'/account/editProfile'}><h2 className="font-semibold underline">Edit Profile</h2></Link>
                    </div>

                    <div className="shadow-2xl p-4 rounded-xl flex flex-col justify-between mb-4">
                        <div>
                            <h2 className="font-bold text-2xl text-blue-500">About me</h2>
                            <p className="text-left mt-4">{user?.desc}</p>
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
            )}
         
         <img src="/Users/huynhphuong/Desktop/CS-157C/157C-project/hosthub/frontend/src/assets/HostHub.png" alt="" />

           
        </div>
    )
}