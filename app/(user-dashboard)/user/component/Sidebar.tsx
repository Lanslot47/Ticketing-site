"use client"
import Link from "next/link"
import { Home } from "lucide-react";
import { Film } from "lucide-react";
import { TbBrandBooking } from "react-icons/tb";
import { GiRamProfile } from "react-icons/gi";
import { useState } from "react"
import { FiMenu } from "react-icons/fi"
const Sidebar = () => {
    const [open, setOpen] = useState(false)
    const list = [
        { id: 1, url: "../user", title: "Dashboard", icon: <Home /> },
        { id: 2, url: "../user/movies", title: "Movies", icon: <Film /> },
        { id: 3, url: "../user/bookings", title: "Bookings", icon: <TbBrandBooking /> },
        { id: 4, url: "../user/profile", title: "Profile", icon: <GiRamProfile /> },
    ]
    return (
        <div>
            <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <button
                    onClick={() => setOpen(!open)}
                    className="text-gray-600 focus:outline-none"
                >
                    <FiMenu size={24} />
                </button>
            </div>


            <div
                className={`fixed top-0 left-0 h-full bg-black border-r-2 border-gray-300 px-6 py-6 w-64 transform 
                    ${open ? "translate-x-0" : "-translate-x-full"} 
                    md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
            >
                <div>
                    <h1 className="text-white font-bold font-sans text-xl flex items-center gap-2 mb-6">
                        {/* <Image src={"/Capture.PNg"} alt="Logo" height={30} width={30} /> */}
                        <Film className="text-red-600" />
                        CineTickets
                    </h1>
                    <hr className="w-[230px] border-[1.5px] border-gray-300 mb-6" />
                </div>

                <div className="space-y-4 font-semibold">
                    {list.map((lists) => (
                        <Link
                            href={lists.url}
                            key={lists.id}
                            className="flex gap-4 items-center font-sans text-gray-600 hover:bg-gray-900 w-52 px-2 rounded-md py-2 hover:text-red-600"
                            onClick={() => setOpen(false)}
                        >
                            <span>{lists.icon}</span>
                            {lists.title}
                        </Link>
                    ))}
                </div>
            </div>
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-30 md:hidden z-40"
                ></div>
            )}
        </div>
    )
}
export default Sidebar