'use client'

import Image from "next/image";
import  SidebarLeft  from './components/sidebarLeft';
import SidebarSearch from './components/sidebarSearch';

import { useState } from "react";




export default function Home() {
  const [active, setActive] = useState<string>("my")
  const [logged, setLogged] = useState<boolean>(true)
  const [isLogging, setIsLogging] = useState<boolean>(false)

  const handleBgClick  = () => {
    setIsLogging(false);
  }

  const handleBoxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  }

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
    < >
    <div className={`flex w-screen h-screen text-[#032B41] `}>
      
      <SidebarLeft active={active} setActive={setActive} logged={logged} setLogged={setLogged}
      isLogging={isLogging} setIsLogging={setIsLogging}/>
      <div className="w-full h-full">
        <SidebarSearch />
        <div className="flex  "> {mainRender(logged, active)}</div>
      </div>
    </div>
    {isLogging && ( 
      <div
      className="fixed inset-0 bg-black/75  flex items-center justify-center z-50"
      onClick={handleBgClick}
    >
      <div
        className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-96"
        onClick={handleBoxClick}
      >
        <h2 className="text-xl font-semibold mb-4">Log in to Summarist</h2>
        <button className="mt-2 mb-2 w-full bg-[#25396B] text-white py-2 rounded">
          Login as a Guest
        </button>
        <div className="flex mb-2 mt-2 w-full items-center justify-center"> 
          <div className="border-1 border-gray-300 w-full mr-5"> </div>
          <div> or </div>
          <div className="border-1 border-gray-300 w-full ml-5 "> </div>
        </div>
        <button className="w-full mt-2 mb-2  bg-[#4285F4] text-white py-2 rounded">
          Login with Google
        </button>
        <div className="mb-4 mt-2 flex w-full items-center justify-center"> 
          <div className="border-1 border-gray-300 w-full mr-5"> </div>
          <div> or </div>
          <div className="border-1 border-gray-300 w-full ml-5 "> </div>
        </div>
        <input
          type="text"
          placeholder="Email Address"
          className="border p-2 w-full mb-4 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4 rounded"
        />
        <button className="w-full bg-[#2BD97C] text-black py-2 rounded">
          Login
        </button>
        <div className="text-[#1191E9] mt-4 mb-2"> Forgot your password?</div>
        <div className="text-[#1191E9]"> Don't have an account? </div>
      </div>
    </div>
  )};
  </>
  )
}
