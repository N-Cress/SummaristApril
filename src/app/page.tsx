'use client'

import Image from "next/image";
import { TiHomeOutline } from "react-icons/ti";
import { CiBookmark } from "react-icons/ci";
import { FaPenClip } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineCog } from "react-icons/hi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";

import { useState } from "react";




export default function Home() {
  const [active, setActive] = useState("my")
  const [logged, setLogged] = useState(true)

  function mainRender(logged: boolean, active: string) {
    switch(logged) {
      case true:
        switch(active) {
          case "settings":
            return <div className="ml-40 mr-40 w-full">
            <div className="pt-10 font-bold text-4xl">
              <div className="border-b-[#E1E7EA] border-b-1 pb-4 "> Settings </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex flex-col mt-6 pb-4 mb-4 border-b-[#E1E7EA] border-b-1 w-full">
                <div className="font-bold text-xl"> Your Subscription plan</div>
                <div className="pb-2"> Basic </div>
                <div className="bg-[#2BD97C] text-center font-semibold pt-2 pb-2 mr-240  rounded-sm"> Upgrade to Premium </div>
              </div>
              <div>
                <div className="font-bold text-xl"> Email </div>
                <div> hanna@gmail.com </div>
              </div>
            </div>
          </div>
        }
      case false:
        switch(active) {
          case "my":
            return <div className="flex flex-col w-full items-center pt-12">
              <Image src='/login.png' alt="login picture" height={500} width={500}/>
              <div className="text-2xl font-bold"> Log in to your account to see your library. </div>
              <div className="font-semibold mt-4 pt-2 pb-2 pr-16 pl-16 rounded-sm bg-[#2BD97C] "> Login </div>
            </div> 
          case "settings":
            return <div className="w-full">
              <div className="pt-10 font-bold text-4xl">
                <div className="border-b-[#E1E7EA] border-b-1 pb-4 ml-40 mr-40"> Settings </div>
              </div>
              <div className="flex flex-col items-center">
                <Image src='/login.png' alt="login picture" height={500} width={500}/>
                <div className="text-2xl font-bold"> Log in to your account to see your library. </div>
                <div className="text-center font-semibold mt-4 pt-2 pb-2 pl-16 pr-16 rounded-sm bg-[#2BD97C] "> Login </div>
              </div>
            </div>
        }
    }
  }

  return (
    <div className="flex w-screen h-screen text-[#032B41]">
      <div className="w-54 flex flex-col justify-between h-full pb-4 pr-4 pt-4 sidebar">
        <div className="flex flex-col ">
          <Image src="/logo.png" className="pl-4 sidebar_image mb-10" alt="Summarist Logo" height={220} width={220}/>
          <div onClick={() => setActive("for") }className={`cursor-pointer flex p-4 border-l-green-400 pl-3 items-center ${ active === "for" ? "border-l-4" : "pl-2"}`}>
            <TiHomeOutline className="icons"/>
            <div className="pl-2 text-lg"> For you </div>
          </div>
          <div onClick={() => setActive("my") }className={`cursor-pointer flex p-4 border-l-green-400 pl-3 items-center ${ active === "my" ? "border-l-4" : "pl-2"}`}>
            <CiBookmark className="icons"/>
            <div className="pl-2 text-lg"> My Library </div>
          </div>
          <div className={`cursor-not-allowed flex p-4 border-l-green-400 pl-3 items-center ${ active === "highlights" ? "border-l-4" : "pl-2"}`}>
            <FaPenClip className="icons"/>
            <div className="pl-2"> Highlights </div>
          </div>
          <div className={`cursor-not-allowed flex p-4 border-l-green-400 pl-3 items-center ${ active === "search" ? "border-l-4" : "pl-2"}`}>
            <IoIosSearch className="icons" />
            <div className="pl-2"> Search </div>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div onClick={() => setActive("settings") }className={`cursor-pointer flex p-4 border-l-green-400 pl-3 items-center ${ active === "settings" ? "border-l-4" : "pl-2"}`}>
            <HiOutlineCog className="icons" />
            <div className="pl-2"> Settings </div>
          </div>
          <div className={`cursor-not-allowed flex p-4 border-l-green-400 pl-3 items-center ${ active === "help" ? "border-l-4" : "pl-2"}`}>
            <IoIosHelpCircleOutline className="icons" />
            <div className="pl-2"> Help & Support </div>
          </div>
          <div onClick={() => setActive("login") }className={`cursor-pointer flex p-4 border-l-green-400 pl-3 items-center ${ active === "login" ? "border-l-4" : "pl-2"}`}>
            <IoIosLogIn className="icons" />
            <div className="pl-2"> Login </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full">
        <div className="border-b-[#E1E7EA] border-b-1 h-1/12 pr-60">
          <div className="flex h-full items-center w-full justify-end">
            <input className="border-[#E1E7EA] p-2 border-1 h-10 rounded-r-none text-sm pl-4 rounded-xl pr-42" placeholder="Search for books"/> 
            <IoIosSearch className="border-[#E1E7EA] border-1 rounded-l-none h-10 w-10 p-2 rounded-xl"/>
          </div>
        </div>
        <div className="flex  "> {mainRender(logged, active)}</div>
      </div>
    </div>
  );
}
