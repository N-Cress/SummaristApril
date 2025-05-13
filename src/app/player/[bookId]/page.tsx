'use client';

import  SidebarPlayer  from '../../components/SideBarPlayer';
import SidebarSearch from '../../components/sidebarSearch';
import Login from '../../components/login';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../lib/store';
import { useParams } from "next/navigation"
import { useState } from 'react';
import { useGetBookByIdQuery } from "@/lib/features/booksSlice";
import Image from 'next/image';

import { MdOutlineForward10 } from "react-icons/md";
import { MdOutlineReplay10 } from "react-icons/md";
import { FaCirclePlay } from "react-icons/fa6";
import AudioPlayer from '@/app/components/AudioPlayer';


export default function PlayerBook() {
    const [textSize, setTextSize] = useState("base")
    const logging = useSelector((state: RootState) => state.persisted.logging.value)

    const fontSizeMap: Record<string, string> = {
      small: "12px",
      base: "14px",
      medium: "16px",
      large: "20px",
    }

    const params = useParams()
    const id = params.bookId

    const { data: bookData, isLoading, error } = useGetBookByIdQuery(id as string, {
            skip: typeof id !== 'string',
          });
    
          if (!bookData) return <div> Loading...</div>

    return (
        < >
    <div className={`flex w-screen h-screen text-[#032B41] flew-grow pb-20`}>
      
      <SidebarPlayer setTextSize={setTextSize} textSize={textSize}/>
      <div className="w-full h-full  overflow-y-auto">
        <SidebarSearch />
        <div className="flex flex-col w-1/2 ml-80">
            <div className="mt-6 font-bold text-2xl">
                {bookData.title}
            </div>
            <hr  className="h-full mt-4 border-gray-200 border-1"/>
            <pre style={{ fontSize: fontSizeMap[textSize] || "16px" }} className={`mt-4 mb-4 text-wrap text-base font-sans`}> {bookData.summary}</pre>
        </div>
      </div>
      <div className="w-full h-20 fixed bottom-0 left-0 z-10 bg-[#042330] flex items-center justify-between">
        <div className="text-white flex items-center pl-8 h-full">
            <div>
                <Image src={bookData.imageLink} alt={bookData.title} width={70} height={30} className="mr-8" />
            </div>
            <div>
                <div className="text-sm "> {bookData.title} </div>
                <div className="text-sm text-gray-400"> {bookData.author}</div>
            </div>
        </div>
        <div className="flex w-full">
          <AudioPlayer audio={bookData.audioLink}/>
        </div>
        <div>

        </div>
      </div>
    </div>
    {logging && ( 
      <Login />
  )};
  </>
    )
}