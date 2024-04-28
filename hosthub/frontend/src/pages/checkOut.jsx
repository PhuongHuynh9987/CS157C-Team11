import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext.jsx";

export default function CheckOut(){
    const {user,ready} = useContext(UserContext);
    function checkout (){
       
    }

    return(
        <div className="flex items-center justify-center my-20">
          
            <form onSubmit={checkout} className="bg-gray-100 w-2/3 p-10 rounded-2xl">
                <div>
                <h2>Billing Information</h2>
                    <hr/>
                    <div className="flex items-center justify-center">
                        <h3 className="w-1/4">First Name</h3>
                        <input type="text" value = {user?.firstName} />
                    </div>

                    <div className="flex items-center justify-center">
                        <h3 className="w-1/4">Last Name</h3>
                        <input type="text"  value = {user?.lastName} />
                    </div>

                    <div className="flex items-center justify-center">
                        <h3 className="w-1/4">Address Line</h3>
                        <input type="text" />
                    </div>

                    <div className="flex items-center justify-center">
                        <h3 className="w-1/4">City</h3>
                        <input type="text" />
                    </div>

                    <div className="flex items-center justify-center">
                        <h3 className="w-1/4">Country</h3>
                        <input type="text" />
                    </div>

                    <div className="flex items-center justify-center">
                        <h3 className="w-1/4">State/Province</h3>
                        <input type="text" />
                    </div>

                    <div className="flex items-center justify-center">
                        <h3 className="w-1/4">Zip/Postal Code</h3>
                        <input type="text" />
                    </div>

                    <div className="flex items-center justify-center">
                        <h3 className="w-1/4">Phone Number</h3>
                        <input type="text" />
                    </div>

                    <div className="flex items-center justify-center">
                        <h3 className="w-1/4">Email</h3>
                        <input type="text" />
                    </div>
                </div>
                <div className="my-10">
                    <h2>Payment Details</h2>
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
                    </div>
                    <button className="primary">Check out</button>
                </form>

        </div>
    )
}
