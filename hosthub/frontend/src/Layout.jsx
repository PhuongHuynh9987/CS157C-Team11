import Header from "./Header";
import {Outlet} from "react-router-dom"

export default function Layout(){
    return (
        // <div className="px-5 flex flex-col min-h-screen bg-gradient-to-r from-yellow-200 to-blue-200">
        <div className="px-5 flex flex-col h-screen mx-36">

            <Header />
            <Outlet></Outlet>
        </div>
    )
}