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
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { BiCrown } from "react-icons/bi";
import { BiLeaf } from "react-icons/bi";




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
      <div className="flex h-full overflow-y-scroll flex-col">
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
        <div className="flex w-full mt-10 pl-70 pr-70 justify-around">
          <div>
            <div className="text-[#6B757B] font-semibold text-3xl mb-4"> Enhance your knowledge</div>
            <div className="text-[#6B757B] font-semibold text-3xl mb-4"> Achieve greater success</div>
            <div className="text-[#6B757B] font-semibold text-3xl mb-4"> Improve your health </div>
            <div className="text-[#6B757B] font-semibold text-3xl mb-4"> Develop better parenting skills </div>
            <div className="text-[#6B757B] font-semibold text-3xl mb-4"> Increase happiness</div>
            <div className="text-[#6B757B] font-semibold text-3xl mb-4"> Be the best version of yourself!</div>
          </div>
          <div className="flex gap-8 flex-col items-center justify-center bg-[#F1F6F4] p-10">
            <div className="flex justify-start">
              <div className="pr-2 text-xl font-bold text-blue-600"> 93% </div>
              <div className="text-xl w-100"> of Summarist members <span className="font-bold"> significantly increase</span> reading frequency. </div>
            </div>
             <div className="flex ">
              <div className="pr-2 text-xl font-bold text-blue-600"> 96% </div>
              <div className="text-xl w-100"> of Summarist members <span className="font-bold"> establish better </span> habits. </div>
            </div>
             <div className="flex ">
              <div className="pr-2 text-xl font-bold text-blue-600"> 90% </div>
              <div className="text-xl w-100"> have made <span className="font-bold"> significant positive </span> change to their lives. </div>
            </div>
          </div>
        </div>
        <div className="flex w-full mt-10 pl-70 pr-70 items-center justify-around">
          <div className="flex gap-8 flex-col items-center justify-center bg-[#F1F6F4] p-10">
            <div className="flex justify-start">
              <div className="pr-2 text-xl font-bold text-blue-600"> 91% </div>
              <div className="text-xl w-100"> of Summarist members <span className="font-bold"> report feeling more productive </span>  after incorporating the service into their daily routine. </div>
            </div>
             <div className="flex ">
              <div className="pr-2 text-xl font-bold text-blue-600"> 94% </div>
              <div className="text-xl w-100"> of Summarist members have <span className="font-bold"> noticed an improvement</span>  in their overall comprehension and retention of information. </div>
            </div>
             <div className="flex ">
              <div className="pr-2 text-xl font-bold text-blue-600"> 88% </div>
              <div className="text-xl w-100"> of Summarist members <span className="font-bold"> feel more informed </span>  about current events and industry trends since using the platform. </div>
            </div>
          </div>
          <div>
            <div className="text-[#6B757B] font-semibold text-3xl mb-4"> Accomplish your goals</div>
            <div className="text-[#6B757B] font-semibold text-3xl mb-4"> Strengthen your vitality </div>
            <div className="text-[#6B757B] font-semibold text-3xl mb-4"> Expand your learning </div>
            <div className="text-[#6B757B] font-semibold text-3xl mb-4"> Become a better caregiver </div>
            <div className="text-[#6B757B] font-semibold text-3xl mb-4"> Improve your mood </div>
            <div className="text-[#6B757B] font-semibold text-3xl mb-4"> Maximize your abilities </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
         <div className="text-3xl font-bold"> What our members say</div>
        </div>
        <div className="w-full mt-4 flex flex-col items-center ">
          <div className="w-175 font-light text-lg bg-[#FFF3D7] p-4">
            <div className="flex items-center  ">
              <div> Hanna M.</div>
              <div className="pl-2 flex">
                <IoIosStar className="fill-[#0564F1]"/>
                <IoIosStar className="fill-[#0564F1]"/>
                <IoIosStar className="fill-[#0564F1]"/>
                <IoIosStar className="fill-[#0564F1]"/>
                <IoIosStar className="fill-[#0564F1]"/>
              </div>
            </div>
            <div>
              This app has been a <span className="font-semibold"> game-changer </span> for me! It's saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers.
            </div>
          </div>
        </div>
        <div className="w-full mt-4 flex flex-col items-center ">
          <div className="w-175 font-light text-lg bg-[#FFF3D7] p-4">
            <div className="flex items-center ">
              <div> David B. </div>
              <div className="pl-2 flex">
                <IoIosStar className="fill-[#0564F1]"/>
                <IoIosStar className="fill-[#0564F1]"/>
                <IoIosStar className="fill-[#0564F1]"/>
                <IoIosStar className="fill-[#0564F1]"/>
                <IoIosStar className="fill-[#0564F1]"/>
              </div>
            </div>
            <div>
              I love this app! It provides <span className="font-semibold">  concise and accurate summaries </span>  of books in a way that is easy to understand. It's also very user-friendly and intuitive.
            </div>
          </div>
        </div>
        <div className="w-full mt-4 flex flex-col items-center ">
          <div className="w-175 font-light text-lg bg-[#FFF3D7] p-4">
            <div className="flex items-center ">
              <div> Nathan S. </div>
              <div className="pl-2 flex">
                <IoIosStar className="fill-[#0564F1]"/>
                <IoIosStar className="fill-[#0564F1]"/>
                <IoIosStar className="fill-[#0564F1]"/>
                <IoIosStar className="fill-[#0564F1]"/>
                <IoIosStar className="fill-[#0564F1]"/>
              </div>
            </div>
            <div>
              This app is a great way to get the main takeaways from a book without having to read the entire thing. <span className="font-semibold"> The summaries are well-written and informative. </span> Definitely worth downloading.
            </div>
          </div>
        </div>
        <div className="w-full mt-4 flex flex-col items-center ">
          <div className="w-175 font-light text-lg bg-[#FFF3D7] p-4">
            <div className="flex items-center ">
              <div> Ryan R</div>
              <div className="pl-2 flex">
                <IoIosStar className="fill-[#0564F1]"/>
                <IoIosStar className="fill-[#0564F1]"/>
                <IoIosStar className="fill-[#0564F1]"/>
                <IoIosStar className="fill-[#0564F1]"/>
                <IoIosStar className="fill-[#0564F1]"/>
              </div>
            </div>
            <div>
              If you're a busy person who <span className="font-semibold"> loves reading but doesn't have the time </span>  to read every book in full, this app is for you! The summaries are thorough and provide a great overview of the book's content.
            </div>
          </div>
        </div>
         <button onClick={() => dispatch(setLogging(true))}className="ml-170 mr-170 mt-8 bg-[#2BD97C] text-black cursor-pointer py-2 rounded ">
          Login
        </button>
        <div className="w-full flex justify-center mt-16 text-3xl font-bold">
          Start growing with Summarist now
        </div>
        <div className="flex w-full justify-center mt-8">
          <div className="flex max-w-80 mr-10 flex-col bg-[#D7E9FF] p-14 rounded-xl items-center">
            <BiCrown className="fill-[#0365F2]" size={60}/>
            <div className="text-4xl mb-4 mt-4 font-bold"> 3 Million</div>
            <div> Downloads on all platforms</div>
          </div>
          <div className="flex justify-center max-w-80 mr-10 flex-col bg-[#D7E9FF] p-14 rounded-xl items-center">
            <div className="flex">
              <IoIosStar className="fill-[#0365F2]" size={30}/>
              <IoIosStar className="fill-[#0365F2]" size={30}/>
              <IoIosStar className="fill-[#0365F2]" size={30}/>
              <IoIosStar className="fill-[#0365F2]" size={30}/>
              <IoIosStarHalf className="fill-[#0365F2]" size={30}/>
            </div>
            <div className="text-4xl mb-4 mt-4 font-bold"> 4.5 Stars </div>
            <div> Average ratings on iOS and Google Play </div>
          </div>
          <div className="flex justify-center max-w-80 flex-col text-center bg-[#D7E9FF] p-14 rounded-xl items-center">
            <BiLeaf className="fill-[#0365F2]" size={60}/>
            <div className="text-4xl mb-4 mt-4 font-bold"> 97% </div>
            <div> Of Summarist members create a better reading habit </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-full justify-center">
          <div className="flex mt-20 mb-10 w-3/4 justify-around ">
                <div >
                    <div className="text-lg mb-2 font-bold">Actions</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Summarist Magazine</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Cancel Subscription</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Help</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Contact us</div>
                </div>
                <div >
                    <div className="text-lg mb-2 font-bold">Useful Links</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Pricing</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Summarist Business</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Gift Cards</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Authors & Publishers</div>
                </div>
                <div >
                    <div className="text-lg mb-2 font-bold">Company</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">About</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Careers</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Partners</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Code of Conduct</div>
                </div>
                <div >
                    <div className="text-lg mb-2 font-bold">Other</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Sitemap</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Legal Notice</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Terms of Service</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Privacy Policies</div>
                </div>
            </div>
            <div className="font-semibold mb-10">
                 Copyright © 2023 Summarist.
            </div>
        </div>
      </div>
      {logging && ( 
            <Login />
        )};
    </>
  )
}
