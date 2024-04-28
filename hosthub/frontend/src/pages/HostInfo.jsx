import axios from "axios";
import { useEffect, useState ,useContext} from "react";
import { Link, Navigate, useParams } from "react-router-dom"
import bed from "../assets/bed-solid.svg";
import truckPlane from "../assets/truck-plane-solid.svg";
import kitchen from "../assets/kitchen-set-solid.svg"
import groceries from "../assets/groceries-svgrepo-com.svg"
import pets from "../assets/pets.svg"
import { UserContext } from "../UserContext.jsx";


export default function HostInfo(){
    const {user,ready,isHost} = useContext(UserContext);
    const [host,setHost] = useState([])
    const [selecting, setSelecting] = useState(false)
    const [selectedDate, setSelectedDate] = useState('');
    const hostId = useParams().id;
    const [redirect, setRedirect] = useState('');
    const [cart, setCart] = useState('')
  

    useEffect(()=>{
        axios.post("/hostingInfo", {"id":hostId}).then(({data})=>{
            setHost(data)
        })
     },[])

    function checkingOut(ev){
        ev.preventDefault();
        axios.post("/addToCart", {
            "id":hostId,
            "user": user.id,
            "date": selectedDate,
            }).then(({data})=>{
                setCart(data)
                if (data !== 'Failed'){
                    setRedirect(true)
                }
                
                
            })
    }

    if (redirect){
        return <Navigate to={'/checkOut/'+cart.cart} />
    }

    const perkList = ["Airport dropoff", "Airport pickup","Groceries provided",
     "Kitchen Access", "Private Bedroom", "Pets allowed"]
    const icons = [truckPlane, truckPlane, groceries, kitchen, bed, pets]

    function selectingDate(ev,date){
        ev.preventDefault();
        setSelectedDate(date)
        if (!selecting)
            setSelecting(true)
        else 
            setSelecting(false)
    }

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
                    </div>
                </div>
                <div className="my-10 text-left">
                    <h1 className=" text-2xl font-bold">About Us</h1>
                    <p> {host.desc} </p>

                    <h1 className="mt-10  text-2xl font-bold">Services</h1>
                    <div className="grid grid-cols-3 gap-5 mt-5 lg:grid-cols-4">
                        {host.perks && host.perks.map((perk,key)=>(
                            <div key = {key} >
                                <h2>{perk}</h2>
                                <img className="w-7" src={icons[perkList.indexOf(perk)]}  />
                            </div>
                        ))}
                    </div>

                    <h1 className="my-10 text-2xl font-bold">Availability</h1>
  
                   {host.available?.length > 0 && host.available.map((date,key) => (
                     <div className="flex flex-col gap-3 " key={key}>
                        <div className="flex gap-16 items-center border border-2 px- py-3 justify-center rounded-2xl">
                            <div>
                                <h2 className="border-b-2 mb-1">Check in:</h2>
                                <h2>{date.slice(0,10)}</h2>
                            </div>
                            <div>
                                <h2 className="border-b-2 mb-1">Check out:</h2>
                                <h2>{date.slice(11,21)}</h2>
                            </div>  
                            <div>
                                <h2 className="border-b-2 mb-1">Incentive:</h2>
                                <h2> ${date.slice(22,25)}/stay</h2>
                            </div>
                         <button  value = {date} onClick={ev=>selectingDate(ev,date)} className="secondary">Select</button>
                     </div>
                 </div>    
                   ))}


                   {selecting && (
                    <div>
                         <h1 className="mt-16  text-2xl font-bold">Booking Information</h1>
                        <div className="flex justify-center">
                            <form onSubmit={checkingOut} className=" mt-10 border-2 w-1/2 flex flex-col justify-center rounded-xl px-16 py-6">
                            <div className="flex justify-center gap-3 p-2">
                                    <h2>{selectedDate.slice(0,10)}</h2>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                        </svg>
                                        <h2> {selectedDate.slice(11,21)}</h2> 
                                </div>
                                <div className="flex justify-center gap-3 p-4">
                                    <h2>Total Cost: </h2>
                                    <h2>${selectedDate.slice(22,25)} / stay</h2>
                                </div>
                               {user && (
                                // <Link to={'/checkOut'}> <button className="primary">Reserve</button></Link>
                                <button className="primary">Reserve</button>
                               )}
                                {!user && (
                                     <Link to={'/login'}> <button className="primary">Reserve</button></Link>
                                )}

                                {cart === 'Failed' && (
                                    <h2 className='text-center m-4 text-red-500'>You cannot be your own host !!!</h2>
                                )}
                            </form>   
                        </div>
                    </div>
                   )}
                <div>               
            </div>
            </div>
            </div>
        )}
            
        </>
    )
}