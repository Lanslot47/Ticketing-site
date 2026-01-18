"use client"

import { Film, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const Nav = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#0B1221] shadow-md shadow-gray-600">
      <div className="flex items-center justify-between px-6 py-5">
        <h1 className="text-xl text-blue-400 font-semibold flex items-center gap-2">
          <Film className="h-8 w-8 text-indigo-600" />
          <span>CineTicket</span>
        </h1>
        <div className="hidden md:flex space-x-6 text-sm">
          <Link
            href="./Login"
            className="text-white font-semibold hover:text-indigo-600"
          >
            Login
          </Link>

          <Link
            href="./Signup"
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-md font-semibold text-white transition"
          >
            Signup
          </Link>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 bg-[#0B1221]">
          <Link
            href="./Login"
            className="text-white font-semibold hover:text-indigo-600"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>

          <Link
            href="./Signup"
            className="bg-indigo-600 text-center hover:bg-indigo-700 px-6 py-2 rounded-md font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Nav