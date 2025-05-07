'use client'

import { useParams } from "next/navigation"
import { useGetBookByIdQuery } from "@/lib/features/booksSlice";
import  SidebarLeft  from '../../components/sidebarLeft';
import SidebarSearch from '../../components/sidebarSearch';
import { TiMicrophoneOutline } from "react-icons/ti";
import { GiOpenBook } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";




export default function BookPage() {
    const params = useParams()
    const id = params.bookId

    const { data: bookData, isLoading, error } = useGetBookByIdQuery(id as string, {
        skip: typeof id !== 'string',
      });

      if (!bookData) return <div> Loading...</div>

    return(
    <>
        <div className={`flex w-screen h-screen text-[#032B41] flew-grow `}>
            <SidebarLeft />
            <div className="w-full h-full  overflow-y-auto">
            <SidebarSearch />
            
            <div className="flex justify-start ml-60">
                <div>
                    <div className="mt-10 text-3xl font-bold"> {bookData.title} </div>
                    <div className="mt-4 font-bold"> {bookData.author} </div>
                    <div className="mt-4 text-xl "> {bookData.subTitle} </div>
                    <hr className=" border-gray-200 mt-4 border-1"/>
                    <div className="flex mt-2 ">
                        <div className="flex flex-col pr-14 "> 
                            <div className="flex items-center font-semibold pb-2"> 
                                <FaRegStar size={25}/>
                                <div className="pl-2"> {bookData.averageRating}</div>
                                <div  className="pl-2"> ({bookData.totalRating}) ratings </div>
                            </div>
                            <div className="flex items-center font-semibold"> 
                                <TiMicrophoneOutline size={25}/>
                                <div className="pl-2"> Audio & Text </div>
                            </div>
                        </div>
                        <div className="flex flex-col ">
                            <div className="pb-2 flex items-center font-semibold"> 
                                    <FaRegClock size={25}/>
                                    <div className="pl-2"> 3:23 </div>
                            </div>
                            <div className="flex items-center font-semibold"> 
                                    <HiOutlineLightBulb size={25}/>
                                    <div className="pl-2"> {bookData.keyIdeas} Key Ideas</div>
                            </div>
                        </div>
                    </div>
                    <hr className=" border-gray-200 mt-4 border-1"/>
                    <div>

                    </div>
                    <div> </div>
                    <div> </div>

                
                <div>

                </div>
            </div>
            </div>
        </div>
        </div>
    </>
    )
}