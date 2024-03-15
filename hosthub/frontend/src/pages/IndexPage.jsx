import { Link } from "react-router-dom"
import Map from "../Map.jsx"
import bed from "../assets/bed-solid.svg";
import truckPlane from "../assets/truck-plane-solid.svg";
import kitchen from "../assets/kitchen-set-solid.svg"

export default function IndexPage (){

    return (
        // <div className="-m-5 bg-cover bg-[url('https://bpb-us-w2.wpmucdn.com/blogs.sjsu.edu/dist/f/94/files/2022/01/ADJ_sjsu-gate-dschmitz-111417-3154_flat-2.jpg')]">
        <div className="">
           <div className="text-center">
                <h1 className="text-3xl font-mono mt-10">Welcome to SJSU, your new journey!</h1>
            
                <div className="h-svh my-20">
                    <div className="grid gap-1 ml-10 mr-14 grid-cols-[65%_35%] h-full">
                        <div className="flex flex-col gap-5 overflow-y-scroll pr-10">
                            <div className= "text-left border-4 border-blue-100 p-4 flex flex-col gap-3 rounded-lg">
                                <div className="px-2">                                    
                                   <div className="flex gap-5 py-4">
                                        <img className="aspect-square object-cover rounded-2xl w-44" src="https://cpage.sfsu.edu/sites/default/files/images/pathway-sfstate-bridge-1920x800.jpg" alt="" />
                                        <div>
                                            <h1 className="text-2xl text-blue-500 font-bold">Mr. Bob's Home</h1>
                                            <p className="h-36 overflow-scroll py-3">Lorem ipsum dolor sit amet consectetur adipisicing elit,
                                            libero est facere aut obcaecati officia iure fuga sequi, accusamus voluptatum?</p>                               
                                        </div>
                                   </div>
                                </div>

                                <Link to={'/hostpage/:id'}>
                                    <div className="flex justify-between px-2">
                                       <div className="flex items-center gap-3">
                                            <img className="w-7" src={bed} alt="" />
                                            <img className="w-7" src={truckPlane} alt="" />
                                            <img className="w-6" src={kitchen} alt="" />
                                            <h4 className="italic">23 mile</h4>
                                       </div>
                                        <button className="secondary">View</button>
                                    </div>
                                </Link>
                            </div>
                            
                            <Link to={'/hostpage/:id'}>
                                <div className= "text-left border-4 border-blue-100 p-4 flex flex-col gap-3 rounded-lg">
                                <div className="px-2">
                                    <div className="flex gap-5 py-4">
                                        <img className="aspect-square object-cover rounded-2xl w-44 h-44" src="https://cdn.sanity.io/images/32lej2m6/production/6e7fedb71dd3dd4a9f45b14b20c8afc2dae610f7-2500x1875.jpg?auto=format" alt="" />
                                        <div>
                                            <h1 className="text-2xl text-blue-500 font-bold">Aunt Rachel's Place Welcoming</h1>
                                            <p className="h-36 overflow-scroll py-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste odit praesentium aliquid culpa nemo ?</p>                               
                                        </div>
                                    </div>
                                </div>
                            
                                <div className="flex justify-between px-2">
                                    <div className="flex items-center gap-3">
                                        <img className="w-7" src={bed} alt="" />
                                        <img className="w-7" src={kitchen} alt="" />
                                        <h4 className="italic">36 mile</h4>
                                    </div>
                                    <button className="secondary">View</button>
                                </div>    
                            </div>
                           </Link>
                           <div className= "text-left border-4 border-blue-100 p-4 flex flex-col gap-3 rounded-lg">
                               <div className="px-2">
                                  <div className="flex gap-5 py-4">
                                       <img className="aspect-square object-cover rounded-2xl w-44" src="https://www.smartbrief.com/wp-content/uploads/2020/09/pexels-august-de-richelieu-4259140-scaled.jpg" alt="" />
                                       <div>
                                           <h1 className="text-2xl text-blue-500 font-bold">Elena's Home</h1>
                                           <p className="h-36 overflow-scroll py-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste odit praesentium.</p>                               
                                       </div>
                                  </div>
                               </div>

                               <Link to={'/hostpage/:id'}>
                                   <div className="flex justify-between px-2">
                                      <div className="flex items-center gap-3">
                                           <img className="w-7" src={bed} alt="" />
                                           <img className="w-7" src={truckPlane} alt="" />
                                           <h4 className="italic">4 mile</h4>
                                      </div>
                                       <button className="secondary">View</button>
                                   </div>
                               </Link>
                           </div>

                           <div className= "text-left border-4 border-blue-100 p-4 flex flex-col gap-3 rounded-lg">
                               <div className="px-2">
                                  <div className="flex gap-5 py-4">
                                       <img className="aspect-square object-cover rounded-2xl w-44" src="https://cdn.cdnparenting.com/articles/2018/12/14121244/1143416498-H-1024x700.webp" alt="" />
                                       <div>
                                           <h1 className="text-2xl text-blue-500 font-bold">Phuong's Home</h1>
                                           <p className="h-36 overflow-scroll py-3">Lorem ipsum dolor sit, suscipit dolorem architecto ipsa ipsum accusamus voluptatum?</p>                               
                                       </div>
                                  </div>
                               </div>

                               <Link to={'/hostpage/:id'}>
                                   <div className="flex justify-between px-2">
                                      <div className="flex items-center gap-3">
                                           <img className="w-7" src={bed} alt="" />
                                           <img className="w-7" src={truckPlane} alt="" />
                                           <h4 className="italic">10 mile</h4>
                                      </div>
                                       <button className="secondary">View</button>
                                   </div>
                               </Link>
                           </div>
                        </div>


                        <div className="sticky">                
                            <Map />
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}