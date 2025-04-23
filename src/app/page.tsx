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

  return (
    <div className="flex w-screen h-screen">
      <div className="w-54 flex flex-col justify-between h-full pb-4 pr-4 pt-4 sidebar">
        <div className="flex flex-col ">
          <Image src="/logo.png" className="pl-4 sidebar_image mb-10" alt="Summarist Logo" height={220} width={220}/>
          <div onClick={() => setActive("for") }className={`flex p-4 border-l-green-400 pl-3 items-center ${ active === "for" ? "border-l-4" : "pl-2"}`}>
            <TiHomeOutline className="icons"/>
            <div className="pl-2 text-lg"> For you </div>
          </div>
          <div onClick={() => setActive("my") }className={`flex p-4 border-l-green-400 pl-3 items-center ${ active === "my" ? "border-l-4" : "pl-2"}`}>
            <CiBookmark className="icons"/>
            <div className="pl-2 text-lg"> My Library </div>
          </div>
          <div onClick={() => setActive("highlights") }className={`flex p-4 border-l-green-400 pl-3 items-center ${ active === "highlights" ? "border-l-4" : "pl-2"}`}>
            <FaPenClip className="icons"/>
            <div className="pl-2"> Highlights </div>
          </div>
          <div onClick={() => setActive("search") }className={`flex p-4 border-l-green-400 pl-3 items-center ${ active === "search" ? "border-l-4" : "pl-2"}`}>
            <IoIosSearch className="icons" />
            <div className="pl-2"> Search </div>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div>
            <div> Settings </div>
          </div>
          <div>
            <div> Help & Support</div>
          </div>
          <div>
            <div> Login </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full">
        <div>

        </div>

      </div>
    </div>
  );
}
