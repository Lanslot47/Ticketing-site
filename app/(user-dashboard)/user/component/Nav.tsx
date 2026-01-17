"use client"
import { LogOut } from "lucide-react";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { LiaUserFriendsSolid } from "react-icons/lia"
import { CiSettings } from "react-icons/ci"
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/app/lib/supabaseClient";
const Navbar = () => {
    const [user, setUser] = useState<User | null>(null)
    const [showDropDown, setShowDropDown] = useState(false)
    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser()
            if (data?.user) {
                setUser(data.user)
            }
            console.error(error)
        }
            getUser()
        }, []);
const firstLetter = user?.user_metadata?.full_name?.[0] || '?'
return (
    <div className="fixed md:static z-40  w-full h-20 border-b border-gray-800 px-4 py-3 items-center">
        <nav className="flex  justify-between gap-6 md:justify-end ">
            <IoNotificationsCircleSharp size={28} className="text-gray-600" />
            <div onClick={() => setShowDropDown(prev => !prev)}>
                <div className="hover:bg-blue-50 flex items-center gap-5 mb-3 p-2">
                    <div className="h-7 w-7 rounded-2xl border-0  bg-gray-100">
                        <h3 className="text-center font-semibold mt-1">I</h3>
                    </div>
                    <h3 className={`text-sm md:text-base font-semibold text-gray-700 ml-2 truncate hover:bg-blue-50${showDropDown}`}>
                       { firstLetter.toUpperCase()}
                    </h3>
                </div>
                {
                    showDropDown &&
                    <div className="border border-gray-800 font-sans p-2 h-40 mt-3 w-48 inline-block space-y-2 rounded-md ">
                        <h1 className="font-semibold text-white">My Account</h1>
                        <div>
                            <Link href="#" className="hover:bg-gray-200 w-43 rounded-md flex items-center gap-3 p-1 hover:text-blue-400 text-gray-300"><span><LiaUserFriendsSolid size={23} /></span> Profile</Link>
                            <Link href="#" className="hover:bg-blue-200 w-43 rounded-md flex items-center gap-3 p-1 hover:text-blue-400 text-gray-300"><span><CiSettings size={23} /></span> Settings</Link>
                        </div>
                        <hr className="border-gray-300" />
                        <Link href="#" className="hover:bg-blue-200 w-43 rounded-md flex items-center gap-3 p-1 hover:text-blue-400 text-gray-300"><span><LogOut size={23} /></span> Logout</Link>

                    </div>
                }
            </div>
        </nav>
    </div>
);
};

export default Navbar