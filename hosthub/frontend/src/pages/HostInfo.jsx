import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"




export default function HostInfo(){
    const [host,setHost] = useState([])
    const hostId = useParams().id;

    useEffect(()=>{
        axios.post("/hostingInfo", {"id":hostId}).then(({data})=>{
            setHost(data)
        })
     },[])

    return (
        <>
        {host.length !== 0 && (
            <div className="text-center m-10">
                <h1 className="text-yellow-400 text-6xl mb-8 font-bold">HostHub</h1>
                <h2 className="text-4xl">{host.title}</h2>
                <div className="mt-10 grid grid-cols-[1fr_1fr_1fr] gap-4">
                    <img className = "aspect-square object-cover rounded-2xl"   src ={'http://localhost:5000/uploads/'+host.uploadedPhotos[0]} alt="" />
                    <img className = "aspect-square object-cover rounded-2xl"   src ={'http://localhost:5000/uploads/'+host.uploadedPhotos[1]} alt="" />                      
                    <div className="grid grid-cols-2 gap-4">
                        <img className = "aspect-square object-cover rounded-2xl"   src ={'http://localhost:5000/uploads/'+host.uploadedPhotos[2]} alt="" />
                        <img className = "aspect-square object-cover rounded-2xl"   src ={'http://localhost:5000/uploads/'+host.uploadedPhotos[3]} alt="" />
                        <img className = "aspect-square object-cover rounded-2xl"   src ={'http://localhost:5000/uploads/'+host.uploadedPhotos[4]} alt="" />
                        <img className = "aspect-square object-cover rounded-2xl"   src ={'http://localhost:5000/uploads/'+host.uploadedPhotos[5]} alt="" />
                        {/* <img className=" aspect-square object-cover rounded-2xl" src="https://www.smartbrief.com/wp-content/uploads/2020/09/pexels-august-de-richelieu-4259140-scaled.jpg" alt="" /> */}
                        {/* <img className = "aspect-square object-cover rounded-2xl"  src="https://www.smartbrief.com/wp-content/uploads/2020/09/pexels-august-de-richelieu-4259140-scaled.jpg" alt="" />
                        <img className = "aspect-square object-cover rounded-2xl"  src="https://www.smartbrief.com/wp-content/uploads/2020/09/pexels-august-de-richelieu-4259140-scaled.jpg" alt="" /> */}
                    </div>
                </div>
                <div className="mt-10 text-left">
                    <h1 className=" text-2xl font-bold">About Us</h1>
                    <p> {host.desc} </p>

                    <h1 className="mt-10  text-2xl font-bold">Services</h1>
                    
                </div>
            </div>
        )}
            
        </>
    )
}