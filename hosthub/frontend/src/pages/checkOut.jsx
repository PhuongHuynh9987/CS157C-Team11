import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Link, Navigate, useParams } from "react-router-dom"
import Multiselect from 'multiselect-react-dropdown';
import axios from "axios";

export default function CheckOut(){
    const {user} = useContext(UserContext);
    const [addressNumber, setAddressNumber] = useState('');
    const [city , setCity] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const[redirect,setRedirect] = useState(false)
    const [cart, setCart] = useState('');
    const cart_id = useParams().cart_id;

    useEffect(()=> {
        axios.get('/profile').then(({data}) => {
            setAddressNumber(data.addressNumber),
            setCity(data.city),
            setCountry(data.country),
            setState(data.state),
            setZip(data.zip),
            setPhoneNumber(data.phoneNumber),
            setEmail(data.email)
        })
    },[])

    useEffect(()=>{
        try {
            axios.post("/getCart", {"cart_id":cart_id}).then(({data})=>{
                // console.log(data)
                setCart(data)
            })
        }
        catch(e){
            console.log(e)
        } 
    },[])

  
    const months = ["January", "Febuary", "March","April", "May","June", "July", "August","September",
                    "October","November", "December"]
    const years = [...Array(10).fill(1).map( (_, i) => i+2023 )]
   

    function checkout (ev){
        ev.preventDefault();
        try {
            const user_id = user.id
            axios.post("/book",{
                "user":user_id,
            }).then(({data})=>{
              if (data.booking_id){
                alert("Booking Succesfully!")
                setRedirect(true);
              }
            })
        }
        catch(e){
            console.log(e);
        }
    }

   
    if (redirect){
        return <Navigate to ={'/account/profile'} />
    }

    return (
        <div className="flex items-center justify-center my-20">
            <h5></h5>
            <form onSubmit={checkout} className="bg-gray-100 w-2/3 p-10 rounded-2xl">
                <div>
                    <h1>Booking Details</h1>
                    <div className='flex gap-8'>
                        <h2>Host's Full Name:</h2>
                        <h2>{cart.owner_firstName} {cart.owner_lastName}</h2>
                    </div>
                    <h2>Host's Address</h2>
                    <div className="mx-10">
                        <div className='flex gap-8'>
                            <h2>Address Number:</h2>
                            <h2>{cart.address}</h2>
                        </div>
                        <div className='flex gap-8'>
                            <h2>City:</h2>
                            <h2>{cart.city}</h2>
                        </div>
                        <div className='flex gap-8'>
                            <h2>State:</h2>
                            <h2>{cart.state}</h2>
                        </div>
                        <div className='flex gap-8'>
                            <h2>Zipcode:</h2>
                            <h2>{cart.zip}</h2>
                        </div>
                    </div>

                    <h2>Date: </h2>
                    <div className="flex gap-4 items-center mx-10">
                        <h2 className="border border-blue-300 border-2 p-1 rounded-xl"> {cart.date?.slice(0,10)}    </h2>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                        <h2 className="border border-blue-300 border-2 p-1 rounded-xl"> {cart.date?.slice(11,21)}    </h2>
                    </div>
                    <h2 className="mt-4">Total: $ { cart.date?.slice(22,30)}  </h2> 
                </div>

                <div className="my-10">
                    <h1>Billing Information</h1>
                    <hr/>
                    <div className="flex items-center justify-center">
                        <h3 className="w-1/4">First Name</h3>
                        <input type="text" value = {user?.firstName} />
                    </div>

                    <div className="flex items-center justify-center">
                        <h3 className="w-1/4">Last Name</h3>
                        <input type="text"  value = {user?.lastName}/>
                    </div>

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
                <div className="my-10">
                    <h1>Payment Details</h1>
                        <hr />
                        <div className="grid grid-cols-2">
                            <div>
                                <label htmlFor ='master' className="m-3">Mastercard</label>
                                <input name = 'master' type="checkbox" />
                            </div>
                            <div>
                                <label htmlFor ='visa' className="m-3">Visa</label>
                                <input name = 'visa' type="checkbox" />
                            </div>
                            <div>
                                <label htmlFor ='amex' className="m-3" >Amex</label>
                                <input name = 'amex' type="checkbox" />
                            </div>
                            <div>
                                <label htmlFor ='dis' className="m-3">Discover</label>
                                <input name = 'dis' type="checkbox" />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <h2 className="w-1/4">Card Number: </h2>
                            <input type="text"  onChange={''}/>
                        </div>

                        <div className="flex items-center w-full">
                            <h2 className="w-1/4">Expire Month: </h2>
                            <Multiselect  placeholder="Month"
                                isObject={false}  
                                className=""
                                options={months} 
                                // selectionLimit={1}
                                singleSelect = {true}
                              />  
                        </div>

                        <div className="flex items-center w-full">
                            <h2 className="w-1/4">Expire Year: </h2>
                            <Multiselect  placeholder="Year"
                                isObject={false}  
                                className=""
                                options={years} 
                                // selectionLimit={1}
                                singleSelect = {true}
                              />  
                        </div>

                        <div className="flex items-center">
                            <h2 className="w-1/4">CVV: </h2>
                            <input type="text" onChange={''}/>
                        </div>


                    </div>
                    <button className="primary">Check out</button>
                </form>

        </div>
    )
}
