'use client'

import Image from "next/image";
import Link from "next/link";

import { useParams } from "next/navigation"
import { useGetBookByIdQuery } from "@/lib/features/booksSlice";
import  SidebarLeft  from '../../components/sidebarLeft';
import SidebarSearch from '../../components/sidebarSearch';
import Login from '../../components/login';
import { TiMicrophoneOutline } from "react-icons/ti";
import { GiOpenBook } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { CiBookmark } from "react-icons/ci";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../lib/store';



export default function BookPage() {
    const params = useParams()
    const id = params.bookId

    const logging = useSelector((state: RootState) => state.persisted.logging.value)

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
                    <div className="mt-4 text-xl font-light"> {bookData.subTitle} </div>
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
                    <div className="mt-2 flex ">
                        <Link href={`/player/${id}`}>
                            <button className="flex items-center rounded-sm pl-10 pr-10 cursor-pointer pt-3 pb-3 text-white  bg-[#032B41] hover:bg-[#355567]"> 
                                <GiOpenBook size={20} />
                                <div className="pl-2"> Read </div>
                            </button>
                        </Link>
                        <Link href={`/player/${id}`}>
                        <button className="ml-4 flex items-center rounded-sm pl-10 cursor-pointer pr-10 pt-3 pb-3 text-white  bg-[#032B41] hover:bg-[#355567]"> 
                            <TiMicrophoneOutline size={20} />
                            <div className="pl-2"> Listen </div>
                        </button>
                        </Link>
                      
                    </div>
                    <div className="flex mt-4 font-semibold items-center cursor-pointer group"> 
                        <CiBookmark size={30} className="fill-[#2CA2E8] group-hover:fill-[#0442B3] "/>
                        <div className="text-[#2CA2E8] text-xl group-hover:text-[#0442B3]"> Add title to My Library </div>
                    </div>
                    <div className="font-semibold text-lg mt-4"> What&apos;s it about?</div>
                    <div className="flex mt-4 justfy-between">
                        {bookData.tags.map((tag) => {
                            return (
                                <div className="pl-3 pr-3 font-semibold" key={tag} > {tag} </div>
                            )
                        })}
                    </div>
                <div className="mt-4 max-w-200">
                   {bookData.bookDescription}             
                </div>
                <div className="mt-3 font-semibold text-lg"> About the author</div>
                <div className="mt-3 mb-8 max-w-200"> 
                    {bookData.authorDescription}
                </div>
            </div>
            <Image src={bookData.imageLink} alt={bookData.title} width={550} height={100} className=" h-80 pr-60 pt-10"/>
            </div>
        </div>
        </div>
        {logging && ( 
        <Login />
  )};
    </>
    )
}