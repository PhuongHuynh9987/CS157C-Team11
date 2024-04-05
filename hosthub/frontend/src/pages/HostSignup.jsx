import bed from "../assets/bed-solid.svg";
import truckPlane from "../assets/truck-plane-solid.svg";
import kitchen from "../assets/kitchen-set-solid.svg"
import groceries from "../assets/groceries-svgrepo-com.svg"
import pets from "../assets/pets.svg"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Navigate } from "react-router-dom";

export default function HostSignUp(){
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [addressNumber, setAddressNumber] = useState('');
    const [addressStreet, setAddressStreet] = useState('');
    const [cityStateZip, setCityStateZip] = useState('');
    const [photoLink, setPhotoLink] = useState([]);
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [uploadFailure, setUploadFailure] = useState('');
    const [perks, setPerks] = useState([]);
    const [redirect, setRedirect] = useState('')
    const {user,ready,isHost} = useContext(UserContext);
    

    if (ready && !user){
        return <Navigate to = {'/login'} />
    }

    const perkList = ["Airport dropoff", "Airport pickup","Groceries provided",
                    "Kitchen Access", "Private Bedroom", "Pets allowed"]

    const icons = [truckPlane, truckPlane, groceries, kitchen, bed, pets]

    useEffect(()=> {
        axios.get('/hostingInfo').then(({data}) => {
            setTitle(data.title)
            setAddressNumber(data.addressNumber)
            setAddressStreet(data.addressStreet)
            setUploadedPhotos(data.uploadedPhotos)
            setDesc(data.desc)
            setCityStateZip(data.cityStateZip)
            setPerks(data.perks)
        })

    },[])


    async function hostRegister(ev){
        ev.preventDefault();
        const id = user.id;
        if(!isHost)
            try {
                console.log(perks)
                await axios.post('/host', {
                    id,
                    title,
                    desc,
                    addressNumber,
                    addressStreet,
                    cityStateZip,
                    uploadedPhotos,
                    perks
                })
                setRedirect(true);
            }
            catch(e){
                console.log(e);
            }

        else {
            try {
                console.log(perks)
                await axios.put('/host', {
                    id,
                    title,
                    desc,
                    addressNumber,
                    addressStreet,
                    cityStateZip,
                    uploadedPhotos,
                    perks
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
        console.log(ev.target.checked)
        if (ev.target.checked)
            setPerks([...perks, ev.target.value])
        else {
            setPerks(perks.filter((item) => item !== ev.target.value));
            }
  
       
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
                    <p className="text-gray-400 w-56">Number: </p>
                    <input className="p-2" 
                            type="text"
                            value = {addressNumber} 
                            onChange={e=>setAddressNumber(e.target.value)}
                            placeholder="example: 1112" />
                </div>
                <div className="flex gap-3 justify-center items-center">
                    <p className="text-gray-400 w-56">Street: </p>
                    <input className="p-2" 
                            type="text"
                            value = {addressStreet}
                            onChange={e=>setAddressStreet(e.target.value)}
                            placeholder="example: 12th Street" />
                </div>

                <div className="flex gap-3 justify-center items-center">
                    <p className="text-gray-400 w-56">City, State, and Zip Code </p>
                    <input className="p-2"
                            type="text"
                            value = {cityStateZip}
                            onChange={e=>setCityStateZip(e.target.value)}
                            placeholder="example: San Jose, CA, 93451" />
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
                        {perks.includes(perk) && (
                           <div>
                                <input type="checkbox" checked value = {perk} onChange={updatePerks} />
                                <img className="w-7" src={icons[key]} alt="" />
                                <span>{perk}</span>
                           </div>
                        )} 

                        {!perks.includes(perk) && (
                           <div>
                                <input type="checkbox" value = {perk} onChange={updatePerks} />
                                <img className="w-7" src={icons[key]}  alt="" />
                                <span>{perk}</span>
                           </div>
                        )} 
                       
                    </label>
                    ))}                   
                </div>
                <button className="primary my-16">Save</button>
            </form>
        </div>
    )
}