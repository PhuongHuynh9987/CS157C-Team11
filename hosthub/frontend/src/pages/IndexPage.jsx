import { Link } from "react-router-dom"
import Map from "../Map.jsx"

export default function IndexPage (){
    return (
        // <div className="-m-5 bg-cover bg-[url('https://bpb-us-w2.wpmucdn.com/blogs.sjsu.edu/dist/f/94/files/2022/01/ADJ_sjsu-gate-dschmitz-111417-3154_flat-2.jpg')]">
        <div className="">
           <div className="text-center m-9">
                <h1 className="text-yellow-400 text-6xl mb-8 font-bold">HostHub</h1>
                <h1 className="text-3xl font-mono">Welcome to SJSU, your new journey!</h1>
                {/* <div className="grid grid-cols-2 xl:grid-cols-4 md:grid-cols-3 gap-9  m-10"> */}
                <div className="h-svh">
                    <div className="grid gap-14 ml-10 mr-14 my-20 grid-cols-[65%_35%] h-full">
                        <div className="flex flex-col gap-10 overflow-y-scroll">
                            <div className="border border-black p-4 flex flex-col gap-3 rounded-2xl">
                                <h1 className="text-2xl text-blue-500 font-bold font-bold">Aunt Anna's Home</h1>
                                {/* <img src="https://static01.nyt.com/images/2019/04/01/t-magazine/design/ellen-bennett-slide-07HN/ellen-bennett-slide-07HN-superJumbo.jpg" alt="" /> */}
                                <hr className="" />
                                <div className="text-left px-2 ">
                                    <h2 className="text-lg font-bold">Heading</h2>
                                    <p className="h-36 overflow-scroll">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste odit praesentium aliquid culpa nemo, 
                                        libero est facere aut obcaecati officia iure fuga sequi, suscipit dolorem architecto ipsa ipsum accusamus voluptatum?</p>
                                </div>

                                <Link to={'/hostpage/:id'}>
                                    <div className="flex justify-between px-2">
                                        <h4 className="italic">23 mile</h4>
                                        <button className="secondary">View</button>
                                    </div>
                                </Link>
                            </div>

                            <div className="border border-black p-4 flex flex-col gap-3 rounded-2xl">
                                <h1 className="text-2xl text-blue-500 font-bold">Elena's Home</h1>
                                {/* <img src="https://static01.nyt.com/images/2019/04/01/t-magazine/design/ellen-bennett-slide-07HN/ellen-bennett-slide-07HN-superJumbo.jpg" alt="" /> */}
                                <hr className="" />
                                <div className="text-left px-2">
                                    <h2 className="text-lg font-bold">Heading</h2>
                                    <p className="h-36  overflow-scroll">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste odit praesentium aliquid culpa nemo, 
                                        libero est facere aut obcaecati officia iure fuga sequi, suscipit dolorem architecto ipsa ipsum accusamus voluptatum? Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                </div>
                                <Link to={'/hostpage/:id'}> 
                                    <div className="flex justify-between px-2">
                                        <h4 className="italic">10 mile</h4>
                                        <button className="secondary">View</button>
                                    </div>
                                </Link>
                            </div>

                            <div className="border border-black p-4 flex flex-col gap-3 rounded-2xl">
                                <h1 className="text-2xl text-blue-500 font-bold">Phuong's Home</h1>
                                {/* <img src="https://static01.nyt.com/images/2019/04/01/t-magazine/design/ellen-bennett-slide-07HN/ellen-bennett-slide-07HN-superJumbo.jpg" alt="" /> */}
                                <hr className="" />
                                <div className="text-left px-2">
                                    <h2 className="text-lg font-bold">Heading</h2>
                                    <p className="h-36  overflow-scroll">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste odit praesentium aliquid culpa nemo, suscipit dolorem architecto ipsa ipsum accusamus voluptatum?</p>
                                </div>

                                <Link to={'/hostpage/:id'}>
                                    <div className="flex justify-between px-2">
                                        <h4 className="italic">5 mile</h4>
                                        <button className="secondary">View</button>
                                    </div>
                                </Link>
                            </div>
                    
                            <div className="border border-black p-4 flex flex-col gap-3 rounded-2xl">
                                <h1 className="text-2xl text-blue-500 font-bold font-bold">Elena's Home</h1>
                                {/* <img src="https://static01.nyt.com/images/2019/04/01/t-magazine/design/ellen-bennett-slide-07HN/ellen-bennett-slide-07HN-superJumbo.jpg" alt="" /> */}
                                <hr className="" />
                                <div className="text-left px-2">
                                    <h2 className="text-lg font-bold">Heading</h2>
                                    <p className="h-36  overflow-scroll">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste odit praesentium aliquid culpa nemo, 
                                        libero est facere aut obcaecati officia iure fuga sequi, suscipit dolorem architecto ipsa ipsum accusamus voluptatum?</p>
                                </div>

                                <Link to={'/hostpage/:id'}>
                                    <div className="flex justify-between px-2">
                                        <h4 className="italic">32 mile</h4>
                                        <button className="secondary">View</button>
                                    </div>
                                </Link>
                            </div>

                            <div className="border border-black p-4 flex flex-col gap-3 rounded-2xl">
                                <h1 className="text-2xl text-blue-500 font-bold">Sam's Home</h1>
                                {/* <img src="https://static01.nyt.com/images/2019/04/01/t-magazine/design/ellen-bennett-slide-07HN/ellen-bennett-slide-07HN-superJumbo.jpg" alt="" /> */}
                                <hr className="" />
                                <div className="text-left px-2">
                                    <h2 className="text-lg font-bold">Heading</h2>
                                    <p className="h-36  overflow-scroll">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste odit praesentium aliquid culpa nemo, 
                                        libero est facere aut obcaecati officia iure fuga sequi, suscipit dolorem architecto ipsa ipsum accusamus voluptatum? Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                </div>
                                <Link to={'/hostpage/:id'}>
                                    <div className="flex justify-between px-2">
                                        <h4 className="italic">23 mile</h4>
                                        <button className="secondary">View</button>
                                    </div>

                                </Link>
                            </div>

                            <div className="border border-black p-4 flex flex-col gap-3 rounded-2xl">
                                <h1 className="text-2xl text-blue-500 font-bold">Uncle Bob's Home</h1>
                                {/* <img src="https://static01.nyt.com/images/2019/04/01/t-magazine/design/ellen-bennett-slide-07HN/ellen-bennett-slide-07HN-superJumbo.jpg" alt="" /> */}
                                <hr className="" />
                                <div className="text-left px-2">
                                    <h2 className="text-lg font-bold">Heading</h2>
                                    <p className="h-36 overflow-scroll">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste odit praesentium aliquid culpa nemo, suscipit dolorem architecto ipsa ipsum accusamus voluptatum?</p>
                                </div>

                                <Link to={'/hostpage/:id'}> 
                                    <div className="flex justify-between px-2">
                                        <h4 className="italic">15 mile</h4>
                                        <button className="secondary">View</button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div  className="sticky">                
                            <Map />
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}