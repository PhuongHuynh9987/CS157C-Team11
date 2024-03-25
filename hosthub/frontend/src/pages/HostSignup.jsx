import bed from "../assets/bed-solid.svg";
import truckPlane from "../assets/truck-plane-solid.svg";
import kitchen from "../assets/kitchen-set-solid.svg"
import groceries from "../assets/groceries-svgrepo-com.svg"



export default function HostSignUp(){
    const [addressNumber, setAddressNumber] = ('');
    const [addressStreet, setAddressStreet] = ('');

    async function hostRegister(){
        ev.preventDefault();
        const data = await axios.post('/host', {
            addressNumber,
            addressStreet
        })
        setRedirect(true);
    }
    return (
        <div className="m-12">
            <h1 className="text-center font-semibold text-3xl text-yellow-400">Signing up as a host</h1>
            <form onSubmit={hostRegister}>
                <h2 className="font-medium text-2xl mt-4">Title</h2>
                <p className="text-gray-400 w-56">Title as a host</p>
                <input className="p-2" 
                    type="text" 
                    placeholder="title, for example: welcome to my welcoming accomondation" />
            
                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-gray-400 w-56">About us section</p>
                <input className="p-2" type="text" placeholder="tell the host seekers about your service" />

                <h2 className="text-2xl mt-4">Address</h2>
                <div className="flex gap-3 justify-center items-center">
                    <p className="text-gray-400 w-56">Number: </p>
                    <input className="p-2" type="text"value = {addressNumber} placeholder="example: 1112" />
                </div>
                <div className="flex gap-3 justify-center items-center">
                    <p className="text-gray-400 w-56">Street: </p>
                    <input className="p-2" type="text"value = {addressStreet} placeholder="example: 12th Street" />
                </div>

                <div className="flex gap-3 justify-center items-center">
                    <p className="text-gray-400 w-56">City, State, and Zip Code </p>
                    <input className="p-2" type="text" placeholder="example: San Jose, CA, 93451" />
                </div>

                <h2 className="text-2xl mt-4">Photos</h2>
                <p className="text-gray-400 w-56">more = better</p>
               
                <div className="flex items-center gap-4">
                    <input className="p-2" type="text" placeholder="Addding a photo using a link" />
                    <button className="secondary h-10 text-white">Add photo</button>
                </div>
                
                <div className="grid grid-cols-4">
                    <button className="border border-blue-100 p-16 rounded-2xl my-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg> Upload
                    </button>
                </div>

                <h2 className="font-medium text-2xl mt-4">Services</h2>
                <p className="text-gray-400 w-full">Select services that you provide</p>
                <div className="grid grid-cols-3 gap-5 mt-5 lg:grid-cols-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" id="" />
                        <img className="w-7" src={truckPlane} alt="" />
                        <span>Airport pickup</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" id="" />
                        <img className="w-7" src={truckPlane} alt="" />
                        <span>Airport dropoff</span>
                    </label>

                     <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" id="" />
                        <img className="w-6" src={kitchen} alt="" /> 
                        <span>Kitchen Access</span>
                    </label>


                     <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox"id="" />
                        <img className="w-7" src={groceries} alt="" />
                        <span>Groceries provided</span>
                    </label>

                     <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" id="" />
                        <img className="w-7" src={bed} alt="" />
                        <span>Bedroom</span>
                    </label>
                </div>
                <button className="primary mt-10">Register</button>
            </form>
        </div>
    )
}