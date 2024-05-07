import { Link ,useNavigate, useLocation,useSearchParams} from "react-router-dom"
import Map from "../Map.jsx"

import {useContext, useEffect, useState} from "react";
import axios, { all } from "axios";
import bed from "../assets/bed-solid.svg";
import truckPlane from "../assets/truck-plane-solid.svg";
import kitchen from "../assets/kitchen-set-solid.svg"
import groceries from "../assets/groceries-svgrepo-com.svg"
import pets from "../assets/pets.svg"

export default function IndexPage (){
    const [allHosts, setAllHosts] = useState([])
    const icons = [truckPlane, truckPlane, groceries, kitchen, bed, pets]
    const perkList = ["Airport dropoff", "Airport pickup","Groceries provided",
    "Kitchen Access", "Private Bedroom", "Pets allowed"]

    const {state} = useLocation();
    useEffect(()=> {
        if (state === null){
            axios.get('/fetch_allHost').then(({data}) => {
                console.log(data)
                setAllHosts(data)
             })
        }

        else {
            const{host} = state;         
            axios.post('/fetch_allHost', {"hostList":host}).then(({data}) => {
                setAllHosts(data)
                })
        }
    },[])
    return (
        <div className="">
           <div className="text-center">
                <div className="flex justify-center items-center gap-4">
                    <h1 className="text-3xl font-mono mt-10">Welcome to SJSU, your new journey!</h1>
                    <img className="w-28" src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/San_Jose_State_Spartans_logo.svg/225px-San_Jose_State_Spartans_logo.svg.png" alt="" />
                </div>
                <div className="h-svh my-20">
                    <div className="grid gap-1 ml-10 mr-14 grid-cols-[65%_35%] h-full">
                    <div className="flex flex-col gap-5 overflow-y-scroll pr-10">
                        {allHosts?.length > 0 && allHosts?.map((host,key) => (
                                <Link to={'/hostpage/'+host.pk} key={key} >
                                    <div className= "text-left border-4 border-blue-100 p-4 flex flex-col gap-3 rounded-lg">
                                        <div className="px-2">                                    
                                        <div className="flex gap-5 py-4">
                                                <img className="aspect-square object-cover rounded-2xl w-44" src={'http://localhost:5000/uploads/'+ host.uploadedPhotos[0]}alt="" />
                                                <div>
                                                    <h1 className="text-2xl text-blue-500 font-bold">{host.title}</h1>
                                                    <p className="h-36 overflow-scroll py-3">{host.desc}</p>                               
                                                </div>
                                        </div>
                                        </div>
                                        <div className="flex justify-between px-2">
                                            <div className="flex items-center gap-3">
                                                {host.perks && host.perks.map((perk,key)=>(
                                                    <img className="w-7" src={icons[perkList.indexOf(perk)]} key = {key}alt="" />
                                                ))}
                                            </div>
                                            <h4 className="italic">23 mile</h4>
                                          
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                
                        <div className="sticky">                
                            <Map />
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
    // }
}