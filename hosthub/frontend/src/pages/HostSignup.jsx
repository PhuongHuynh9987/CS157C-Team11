import bed from "../assets/bed-solid.svg";
import truckPlane from "../assets/truck-plane-solid.svg";
import kitchen from "../assets/kitchen-set-solid.svg"
import groceries from "../assets/groceries-svgrepo-com.svg"
import pets from "../assets/pets.svg"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Navigate } from "react-router-dom";
// import { format } from 'date-fns';

export default function HostSignUp(){
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [photoLink, setPhotoLink] = useState([]);
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [uploadFailure, setUploadFailure] = useState('');
    const [perks, setPerks] = useState([]);
    const [redirect, setRedirect] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [cost, setCost] = useState('')
    const [available, setAvailable] = useState([]);
    const [availability, setAvailability] = useState(false);
    const {user,ready,isHost,setUser} = useContext(UserContext);


    if (ready && !user){
        return <Navigate to = {'/login'} />
    }


    if (perks === undefined || perks === null ) {
        setPerks([])
    }


    const perkList = ["Airport dropoff", "Airport pickup","Groceries provided",
                    "Kitchen Access", "Private Bedroom", "Pets allowed"]
    const icons = [truckPlane, truckPlane, groceries, kitchen, bed, pets]

  
    useEffect(()=> {
        try {
            axios.get('/hostingInfo').then(({data}) => {
                setTitle(data.title)
                setAddress(data.address)
                setCity(data.city)
                setState(data.state)
                setZip(data.zip)
                setUploadedPhotos(data.uploadedPhotos)
                setDesc(data.desc)
                setPerks(data.perks)
                setAvailable(data.date)
            })
            if (!user){
                <Navigate to = {'/login'} />
            }
        } catch(e){
            console.log(e.code)
            if(e.code === 401){
                setUser(null)
                return <Navigate to = {'/login'} />
            }
           
        } 
    },[])

    async function hostRegister(ev){
        ev.preventDefault();
        const id = user.id;
        if(!isHost)
            try {
                await axios.post('/host', {
                    id,
                    title,
                    desc,
                    address,
                    city,
                    state,
                    zip,
                    perks,
                    uploadedPhotos,
                    available
                })
                setRedirect(true);
            }
            catch(e){
                console.log(e);
            }

        else {
            try {
                console.log(available);
                await axios.put('/host', {
                    id,
                    title,
                    desc,
                    address,
                    city,
                    state,
                    zip,
                    uploadedPhotos,
                    perks,
                    available
                })
                setRedirect(true);
            }
            catch(e){
                console.log(e);
            }
        }
    }

    if (redirect){
        return <Navigate to ={'/account/profile'} />
    }
    
    async function addPhotoByLink (ev){
        ev.preventDefault();
        try{
            const file = await axios.post('/upload-by-link',{'link': photoLink})    
            setUploadedPhotos(prev => {
                return [...prev, file.data]
            })
            setPhotoLink('');
            
        }
        
        catch(e){
            setUploadFailure(true);
            console.log(e);
        } 
    }

    function uploadingPhotos(ev){
        ev.preventDefault();
        const file = ev.target.files;
        const data = new FormData()
        data.set('file', file[0])
        axios.post('/upload', data, {
            headers: {"Content-Type": 'multipart/form-data'}
        }).then(res => {
            const {data:filename} = res;
            setUploadedPhotos(prev => {
                return [...prev, filename]
            })
        })
    }

    function updatePerks(ev){
        if (ev.target.checked)
            setPerks([...perks, ev.target.value])
        else {
            setPerks(perks.filter((item) => item !== ev.target.value));
            }
    }


    function updateAvailability(ev){
        ev.preventDefault();
        let date = [fromDate, toDate, cost]
        
        if (available !== undefined){
            setAvailable([...available,date.join()])
        }

        else {
            setAvailable([date.join()]);
        }
        
        setFromDate('')
        setToDate('')
        setAvailability(false)
    }


    function deleteAvailability (ev,data){
        ev.preventDefault()
        setAvailable(available.filter((item) => item !== data));
    }

    function showCalenda(ev){
        ev.preventDefault();
        setAvailability(true)
    }



    return (
        <div className="m-12" onMouseDown={e=>setUploadFailure(false)}>
            <h1 className="text-center font-semibold text-3xl text-yellow-400">Signing up as a host</h1>
            <form onSubmit={hostRegister} >
                <h2 className="font-medium text-2xl mt-4">Title</h2>
                <p className="text-gray-400 w-56">Title as a host</p>
                <input className="p-2" 
                    type="text"
                    value = {title}
                    onChange={e=>setTitle(e.target.value)}
                    placeholder="title, for example: welcome to my welcoming accomondation" />

                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-gray-400 w-56">About us section</p>
                <textarea className="p-2" 
                        type="text" 
                        value = {desc}
                        onChange={e=>setDesc(e.target.value)}
                        placeholder="tell the host seekers about your service" />

                <h2 className="text-2xl mt-4">Address</h2>
                <div className="flex gap-3 justify-center items-center">
                    <p className="text-gray-400 w-56">Address: </p>
                    <input className="p-2" 
                            type="text"
                            value = {address} 
                            onChange={e=>setAddress(e.target.value)}
                            placeholder="example: 1112 12th Street" />
                </div>
                <div className="flex gap-3 justify-center items-center">
                    <p className="text-gray-400 w-56">City: </p>
                    <input className="p-2" 
                            type="text"
                            value = {city}
                            onChange={e=>setCity(e.target.value)}
                            placeholder="example: San Jose" />
                </div>

                <div className="flex gap-3 justify-center items-center">
                    <p className="text-gray-400 w-56">State </p>
                    <input className="p-2"
                            type="text"
                            value = {state}
                            onChange={e=>setState(e.target.value)}
                            placeholder="example: CA" />
                </div>

                <div className="flex gap-3 justify-center items-center">
                    <p className="text-gray-400 w-56">Zipcode: </p>
                    <input className="p-2"
                            type="text"
                            value = {zip}
                            onChange={e=>setZip(e.target.value)}
                            placeholder="example: 94531" />
                </div>

                <h2 className="text-2xl mt-4">Photos</h2>
                <p className="text-gray-400 w-56">more = better</p>
                {uploadFailure && (
                   <h3 className="text-red-600">Photo is not valid!</h3>
                )}
               
                <div className="flex items-center gap-4">
                    <input className="p-2" 
                            type="text" 
                            value = {photoLink}
                            onChange={e=>setPhotoLink(e.target.value)}
                            placeholder="Addding a photo using a link" />
                    <button onClick={addPhotoByLink} className="secondary h-10 text-white">Add photo</button>
                </div>
                
                <div className="grid grid-cols-4 gap-5 my-2">
                    {uploadedPhotos?.length > 0 && uploadedPhotos.map((link,key) => (
                        <img className="aspect-square object-cover rounded-2xl" src ={'http://localhost:5000/uploads/'+link} alt="" key = {key}/>
                    ))}
                    <label className="border border-blue-100 p-16 rounded-2xl  flex items-center justify-center gap-2 cursor-pointer">
                        <input type="file" 
                                className="hidden" 
                                onChange={uploadingPhotos}/>
                        <div className="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg> 
                        </div>
                        <h2 className="">Upload</h2>
                    </label>
                </div>
   
                <h2 className="font-medium text-2xl mt-4">Services</h2>
                <p className="text-gray-400 w-full">Select services that you provide</p>
                <div className="grid grid-cols-3 gap-5 mt-5 lg:grid-cols-4">
             
                    {perkList.map((perk,key) => (
                        <label className="flex items-center gap-3 cursor-pointer"  key ={key} >   
                       
                            {  perks?.includes(perk) && (
                            <div>
                                <input type="checkbox" checked value = {perk} onChange={updatePerks} />
                                <img className="w-7" src={icons[key]} alt="" />
                                <span>{perk}</span>
                            </div>
                            )} 

                            {!perks?.includes(perk) && (
                            <div>
                                    <input type="checkbox" value = {perk} onChange={updatePerks} />
                                    <img className="w-7" src={icons[key]}  alt="" />
                                    <span>{perk}</span>
                            </div>
                            )} 
                        </label>
                    ))} 
                </div>

                <h2 className="font-medium text-2xl my-4">Availability</h2>
          

                {availability && (
                    <div className="flex gap-5">
                        <input type="date" value = {fromDate} onChange={ev => setFromDate(ev.target.value)}/>
                        <input type="date"   value = {toDate} onChange={ev => setToDate(ev.target.value)}/>
                        <input type="text" className="pl-2" value ={cost} onChange={ev => setCost(ev.target.value)}/>
                        <button className="secondary" onClick={updateAvailability}>Add</button>
                    </div>
                    
                )}
                {!availability &&(
                    <div className="mt-10">
                        <div className="flex flex-col gap-3 ">
                            
                            {available?.length > 0 && available.map((data,key)=>(
                                <div  key = {key} className="flex gap-16 items-center border border-2 px- py-3 justify-center rounded-2xl">
                                    <div>
                                        <h2 className="border-b-2 mb-1">Check in:</h2>
                                        <h2> {data.slice(0,10)}</h2>
                                        
                                    </div>
                                    
                                    <div>
                                        <h2 className="border-b-2 mb-1">Check out:</h2>
                                        <h2>{data.slice(11,21)}</h2> 
                                    </div>  
                                    <div>
                                        <h2 className="border-b-2 mb-1">Price:</h2>
                                        <h2> ${data.slice(22,25)} /stay</h2>
                                    </div>
                                    
                                    <button className="secondary" value = {data}  onClick={ev=> deleteAvailability(ev,data)}>Delete</button>

                                </div>
                            ) 
                            )}
                        </div>  
                        <button className="secondary h-10 text-white my-10" onClick={showCalenda}>Add a time length</button>
                     </div>
                )}
                <button className="primary my-16">Save</button>
            </form>
        </div>
    )
}