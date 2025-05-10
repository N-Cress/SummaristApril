'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../lib/store';
import { setLogging } from "@/lib/features/loggingSlice";
import Login from './components/login';
import Image from 'next/image';
import { IoDocumentTextSharp } from "react-icons/io5";
import { BsFillLightbulbFill } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";



export default function Home() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
   const logged = useSelector((state: RootState) => state.persisted.logged.value)
   const logging = useSelector((state: RootState) => state.persisted.logging.value)
   const dispatch = useDispatch()

  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    if (mounted && logged) {
      router.push('/for-you')
    }
  }, [mounted, router, logged])  

  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-full justify-around mt-4">
          <Image src="/logo.png" className="pl-4 sidebar_image mb-10 " alt="Summarist Logo" height={140} width={240} />
          <div className="pl-4 pt-2 text-lg flex font-sem gap-5">
            <div> Login </div>
            <div> About </div>
            <div> Contact </div>
            <div> Help </div>
          </div>
        </div>
        <div className="w-full flex pl-60 pr-60 justify-around">
          <div className="pt-10"> 
            <div className="text-4xl font-bold w-100 mb-4 "> Gain more Knowledge in less time</div>
            <div className="text-lg font-light w-80"> Great summaries for busy people, individuals who barely have time to read, and even people who don't like to read.</div>
            <button onClick={() => dispatch(setLogging(true))} className="bg-[#2DE07F] mt-4 rounded-lg pr-30 pl-30 pt-2 pb-2 cursor-pointer hover:bg-[#20BA68]"> Login </button>
          </div>
          <Image src="/landing.png" alt="Women looking at browser" className="" height={140} width={440}/>
        </div>
        <div className="mt-6 text-4xl font-bold w-full flex justify-center"> Understand books in few minutes </div>\
        <div className="flex w-full justify-center mt-10 gap-40">
          <div className="flex flex-col items-center justify-center">
            <IoDocumentTextSharp size={60}/>
            <div className="text-2xl pt-2 font-semibold">
              Read or Listen
            </div>
            <div className="sm pt-2 font-light w-50 text-center">
              Save time by getting the core ideas from the best books.
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <BsFillLightbulbFill size={60}/>
            <div className="text-2xl pt-2 font-semibold">
              Find your next read
            </div>
            <div className="sm pt-2 font-light w-50 text-center">
              Explore book lists and personalized recommendations.
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <FaMicrophone size={60}/>
            <div className="text-2xl pt-2 font-semibold">
              Briefcasts
            </div>
            <div className="sm pt-2 font-light w-50 text-center">
              Gain valuable insights from briefcasts
            </div>
          </div>
        </div>
        <div>
          <div>
            <div> Enhance your knowledge</div>
            <div> Enhance your knowledge</div>
            <div> Enhance your knowledge</div>
            <div> Enhance your knowledge</div>
            <div> Enhance your knowledge</div>
            <div> Enhance your knowledge</div>
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
