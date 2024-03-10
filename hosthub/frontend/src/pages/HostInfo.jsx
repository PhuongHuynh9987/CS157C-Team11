export default function HostInfo(){
    return (
        <>
            <div className="text-center m-10">
                <h1 className="text-yellow-400 text-6xl mb-8 font-bold">HostHub</h1>
                <h2 className="text-4xl">Welcome to Adam's home!</h2>
                <div className="mt-10 grid grid-cols-[1fr_1fr_1fr] gap-4">
                    <img className="aspect-square object-cover rounded-2xl" src="https://www.smartbrief.com/wp-content/uploads/2020/09/pexels-august-de-richelieu-4259140-scaled.jpg" alt="" />
                    <img className = "aspect-square object-cover rounded-2xl" src="https://www.thespruce.com/thmb/HrWPmUEjB_yA71L6OJjiQPPvov4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/master-bedroom-in-new-luxury-home-with-chandelier-and-large-bank-of-windows-with-view-of-trees-1222623844-212940f4f89e4b69b6ce56fd968e9351.jpg" alt="" />
                    <div className="grid grid-cols-2 gap-4">
                        <img className=" aspect-square object-cover rounded-2xl" src="https://www.smartbrief.com/wp-content/uploads/2020/09/pexels-august-de-richelieu-4259140-scaled.jpg" alt="" />
                        <img className = "aspect-square object-cover rounded-2xl"  src="https://www.smartbrief.com/wp-content/uploads/2020/09/pexels-august-de-richelieu-4259140-scaled.jpg" alt="" />
                        <img className = "aspect-square object-cover rounded-2xl"  src="https://www.smartbrief.com/wp-content/uploads/2020/09/pexels-august-de-richelieu-4259140-scaled.jpg" alt="" />
                        <img className = "aspect-square object-cover rounded-2xl"  src="https://www.smartbrief.com/wp-content/uploads/2020/09/pexels-august-de-richelieu-4259140-scaled.jpg" alt="" />
                    </div>
                    {/* <div>
                        a
                    </div>

                    <div>
                        b
                    </div> */}
                </div>
            </div>
        </>
    )
}