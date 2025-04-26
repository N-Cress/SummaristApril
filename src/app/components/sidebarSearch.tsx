import { IoIosSearch } from "react-icons/io";

export default function SidebarSearch() {
    return(
        <div className="border-b-[#E1E7EA] border-b-1 h-1/12 pr-60">
            <div className="flex h-full items-center w-full justify-end">
                <input className="border-[#E1E7EA] p-2 border-1 h-10 rounded-r-none text-sm pl-4 rounded-xl pr-42" placeholder="Search for books"/> 
                <IoIosSearch className="border-[#E1E7EA] border-1 rounded-l-none h-10 w-10 p-2 rounded-xl"/>
            </div>
        </div>
    )
}