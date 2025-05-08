'use client';

import  SidebarLeft  from '../../components/sidebarLeft';
import SidebarSearch from '../../components/sidebarSearch';
import Login from '../../components/login';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../lib/store';
import { useParams } from "next/navigation"
import { useGetBookByIdQuery } from "@/lib/features/booksSlice";
import Image from 'next/image';

import { MdOutlineForward10 } from "react-icons/md";
import { MdOutlineReplay10 } from "react-icons/md";
import { FaCirclePlay } from "react-icons/fa6";


export default function PlayerBook() {
    const logging = useSelector((state: RootState) => state.persisted.logging.value)

    const params = useParams()
    const id = params.bookId

    const { data: bookData, isLoading, error } = useGetBookByIdQuery(id as string, {
            skip: typeof id !== 'string',
          });
    
          if (!bookData) return <div> Loading...</div>

    return (
        < >
    <div className={`flex w-screen h-screen text-[#032B41] flew-grow pb-20`}>
      
      <SidebarLeft
      />
      <div className="w-full h-full  overflow-y-auto">
        <SidebarSearch />
        <div className="flex flex-col w-1/2 ml-80">
            <div className="mt-4 font-bold text-2xl">
                {bookData.title}
            </div>
            <hr  className="h-full mt-4 border-gray-200 border-1"/>
            <div className="mt-4"> {bookData.summary}</div>
        </div>
      </div>
      <div className="w-full h-20 fixed bottom-0 left-0 z-10 bg-[#042330] flex items-center justify-between">
        <div className="text-white flex items-center h-full">
            <div>
                <Image src={bookData.imageLink} alt={bookData.title} width={30} height={30} className="" />
            </div>
            <div>
                <div> {bookData.title} </div>
                <div> {bookData.author}</div>
            </div>
        </div>
        <div>

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