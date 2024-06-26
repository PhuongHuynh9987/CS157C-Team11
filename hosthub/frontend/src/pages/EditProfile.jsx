import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function EditProfile(){
    const {user,ready} = useContext(UserContext);
    const [uploading, setUploadingAction] = useState(false);
    const checkBox = ['Freshman', 'Sophormore', 'Junior','Senior','Exchange Student', 'Graduate']
    const [status, setStatus] = useState('');
    const [gender, setGender] = useState('');
    const [uploadedPhoto, setUploadedPhoto] = useState('');
    const [redirect, setRedirect] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [addressNumber, setAddressNumber] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [country, setCountry] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('');
    const [desc, setDesc] = useState('');

    if (ready && !user){
        return <Navigate to = {'/login'} />
    }

    
    useEffect(()=> {
        axios.get('/profile').then(({data}) => {
            setFirstName(data.firstName),
            setLastName(data.lastName),
            setEmail(data.email),
            setGender(data.gender)
            setProfilePhoto(data.profilePhoto),
            setDesc(data.desc),
            setStatus(data.status),
            setAddressNumber(data.addressNumber),
            setCity(data.city),
            setState(data.state),
            setZip(data.zip),
            setCountry(data.country)
        })
    },[])


  

    function editPhoto(){
        if (uploading)
            setUploadingAction(false)
        else
            setUploadingAction(true)
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
            setUploadedPhoto(filename)
        })
    }

    async function saveUpdated(ev){
        ev.preventDefault();
        const id =  user.id;
        if (!uploadedPhoto){
            setUploadedPhoto(profilePhoto) 
        }

        try {
            if (!uploadedPhoto){
                await axios.put('/updateProfile',{
                    id,
                    firstName,
                    lastName,
                    email,
                    uploadedPhoto:profilePhoto,
                    desc,
                    gender,
                    status,
                    addressNumber,
                    city, 
                    state,
                    zip,
                    country,
                    phoneNumber
                   
                });
                setRedirect(true);
            }
            else{
                await axios.put('/updateProfile',{
                    id,
                    firstName,
                    lastName,
                    email,
                    uploadedPhoto,
                    desc,
                    gender,
                    status,
                    addressNumber,
                    city, 
                    state,
                    zip,
                    country,
                    phoneNumber
                });
                setRedirect(true);
            }
            
        }
        catch(e){
            console.log(e);
        }
   }

    if (redirect){
        return <Navigate to = {'/account/profile'} />
    }

    return (
        <div className="mb-20">
            <h1 className="text-center font-semibold text-3xl text-yellow-400 mb-5">Editing My Profile</h1>
            <form onSubmit={saveUpdated}>
                <div className="flex justify-center my-8">
                    {!uploadedPhoto && profilePhoto && (
                        <img className="aspect-square object-cover rounded-full w-60" src ={'http://localhost:5000/uploads/'+profilePhoto} alt="" />                    
                    )}
                     {uploadedPhoto && (
                        <img className="aspect-square object-cover rounded-full w-60" src ={'http://localhost:5000/uploads/'+uploadedPhoto} alt="" />                    
                    )}
                </div>
                <div className="flex justify-center my-8 items-center gap-5">
                    <h2 className="underline cursor-pointer" onClick={editPhoto}>Edit photo</h2>
                    {uploading && (
                            <label className="border border-blue-100 px-10 py-1 rounded-2xl flex items-center justify-center gap-2 cursor-pointer">
                                <input type="file" 
                                        className="hidden" 
                                        // value={profilePhoto}
                                        onChange={uploadingPhotos}/>
                                <div className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                    </svg> 
                                </div>
                                <h2>Upload</h2>
                            </label>
                        )}
                </div>
                
                <div className="flex items-center"> 
                    <h2 className="w-28">First Name</h2>
                    <input type="text" 
                        value={firstName} 
                        onChange={e => {setFirstName(e.target.value)}}
                        className="px-5" />
                </div>
                <div className="flex items-center mb-2"> 
                    <h2 className="w-28">Last Name</h2>
                    <input type="text" 
                            value={lastName} 
                            onChange={e => {setLastName(e.target.value)}}
                            className="px-5" />
                </div>

                <div className="flex items-center mb-2"> 
                    <h2 className="w-28">Email</h2>
                    <input type="email" 
                            value={email} 
                            onChange={e => {setEmail(e.target.value)}}
                            className="px-5" />
                </div>

                <div>
                <div className="flex items-center justify-center">
                        <h3 className="w-1/4">Address Number</h3>
                        <input type="text" value={addressNumber}  
                                            onChange={e=>setAddressNumber(e.target.value)}/>
                    </div>

                    <div className="flex items-center justify-center">
                        <h3 className="w-1/4">City</h3>
                        <input type="text" value={city}  
                                            onChange={e=>setCity(e.target.value)}/>
                    </div>

                    <div className="flex items-center justify-center">
                        <h3 className="w-1/4">Country</h3>
                        <input type="text" value={country}  
                                            onChange={e=>setCountry(e.target.value)}/>
                    </div>

                    <div className="flex items-center justify-center">
                        <h3 className="w-1/4">State/Province</h3>
                        <input type="text" value={state}  
                                            onChange={e=>setState(e.target.value)} />
                    </div>

                    <div className="flex items-center justify-center">
                        <h3 className="w-1/4">Zip/Postal Code</h3>
                        <input type="text" value={zip}  
                                            onChange={e=>setZip(e.target.value)}/>
                    </div>

                    <div className="flex items-center justify-center">
                        <h3 className="w-1/4">Phone Number</h3>
                        <input type="text" value={phoneNumber}  
                                            onChange={e=>setPhoneNumber(e.target.value)} />
                    </div>

                    <div className="flex items-center justify-center">
                        <h3 className="w-1/4">Email</h3>
                        <input type="text" value={email}  
                                            onChange={e=>setEmail(e.target.value)} />
                    </div>
                </div>

                <h2 className="text-2xl mt-4">Gender</h2> 
                <div className="flex gap-2">
                    <input type="checkbox"
                        value = "Female"
                        onChange={e=> setGender(e.target.value)}
                        checked = {gender === "Female"}/>
                    <label htmlFor="Female">Female</label>
                    <input type="checkbox"
                        value = "Male"
                        onChange={e=> setGender(e.target.value)}
                        checked = {gender === "Male"}/>
                    <label htmlFor="Male">Male</label>
                </div>
                
                <h2 className="text-2xl mt-4">Student Status</h2> 
                <div className="flex gap-4">
                {checkBox.map( item => (
                       <div className="flex gap-2" key = {item}>
                            <input type="checkbox" 
                                value = {item} 
                                onChange = {e=> setStatus(e.target.value)} 
                                checked = {status === item}
                                />
                            <label for={item}>{item}</label>
                        </div>
                    ))}
                </div>
                   

                <h2 className="text-2xl mt-4">About Me</h2>
                <textarea className="p-2" 
                        type="text" 
                        value = {desc}
                        onChange={e=>setDesc(e.target.value)}
                        placeholder="Let the host learn more about you!" />

                 <button className="primary my-16">Update</button>
            </form>
           
        </div>
    )
}