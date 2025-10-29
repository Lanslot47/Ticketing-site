import Link from "next/link"
import { BiMovie, BiSearch } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
const NavBar = () => {
    const lists = [
        { id: 1, title: "Movies", url: "/movies" },
        { id: 2, title: "News", url: "/news" },
        { id: 3, title: "Tv Series", url: "/series" },
        { id: 4, title: "Genre", url: "/genre" },
    ]
    return (
        <nav className="flex justify-between items-center w-full p-6 fixed top-0 z-50 bg-black text-white">
            <div className="">
            <h1 className="items-center flex gap-1 font-sans cursor-pointer text-amber-400 font-extrabold bg-">
                <BiMovie size={20} />
                A Booking
            </h1>
            </div>
            <ul className="hidden md:flex justify-center  gap-6 ">
                {
                    lists.map(items => (
                        <Link href={items.url} key={items.id} className="cursor-pointer hover:underline hover:underline-offset-8">
                            {items.title}
                        </Link>
                    ))
                }
                <div className="flex border p-1 h-7 gap-2 font-sans rounded-md text-gray-500 bg-white">
                    <BiSearch size={20} className="cursor-pointer ml-2 font-bold"/>
                    <input type="text" placeholder="Search Movies or theatres" className="outline-none text-sm" />
                </div>
            </ul>

            <div>
                <CgProfile size={30} className="cursor-pointer" />
            </div>
        </nav>
    )
}
export default NavBar