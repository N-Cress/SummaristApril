'use client'

import Image from "next/image";
import  SidebarLeft  from './components/sidebarLeft';
import SidebarSearch from './components/sidebarSearch';
import Login from './components/login';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from './firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store';


const auth = getAuth(app);


export default function Home() {
  const active = useSelector((state: RootState) => state.active.value)
  const logged = useSelector((state: RootState) => state.logged.value)
  const logging = useSelector((state: RootState) => state.logging.value)


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
      
      <SidebarLeft />
      <div className="w-full h-full">
        <SidebarSearch />
        <div className="flex  "> {mainRender(logged, active)}</div>
      </div>
    </div>
    {logging && ( 
      <Login />
  )};
  </>
  )
}
