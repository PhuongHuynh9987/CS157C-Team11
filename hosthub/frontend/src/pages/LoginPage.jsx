import { Link } from "react-router-dom";

export default function LoginPage() {
    return(
        <div className="flex grow justfiy-round items-center mb-32">
            <div className="flex flex-col grow text-center">
                <h1 className="text-4xl text-center">Login</h1>
                <form className="max-w-2xl mx-auto text-center" action="">
                    <input type="email" name="email" placeholder="your@email.com"/>
                    <input type="password" name="password" placeholder="your password"/>
                    <button className="primary">Login</button>
                </form>

                <p className="mt-4 text-gray-500">Don't have an account yet? <span className="mx-1"></span>
                    <Link className="underline text-black font-bold" to={"/register"}> Register now</Link></p>
           </div>
        </div>
    )
}