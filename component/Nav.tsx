import { Film } from "lucide-react";
import Link from "next/link";
const Nav = () => {
    return (
        <nav className="flex justify-between px-6 py-6 fixed w-full z-50 top-0  bg-[#0B1221] shadow-md shadow-gray-600">
            <h1 className="text-xl text-blue-400 font-semibold font-sans flex items-center gap-2">
                <Film className="h-12 w-12 text-indigo-600 mr-3" />
                <span>CineTicket</span>

            </h1>
            <div className="space-x-6 text-sm ">
                <button className="hover:text-indigo-600 text-white cursor-pointer font-semibold">
                    <Link href="./Login">Login</Link>
                </button>
                <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-md font-semibold font-sans text-white cursor-pointer hover:transform hover:-translate-0.5  hover:duration-75 ">
                    <Link href="./Signup">Signup</Link>
                </button>
            </div>
        </nav>
    )
}
export default Nav