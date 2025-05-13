'use client'

import Image from "next/image";
import  SidebarLeft  from '../components/sidebarLeft';
import SidebarSearch from '../components/sidebarSearch';
import Login from '../components/login';


import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../lib/store';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase';
import Link from "next/link";

const auth = getAuth(app);


export default function ForYou() {
  const [active, setActive] = useState<string>("settings")
  const [logged, setLogged] = useState<boolean>(false)
  const [isLogging, setIsLogging] = useState<boolean>(false)
  const [subLevel, setSubLevel] = useState<string>("basic")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const uEmail = useSelector((state: RootState) => state.persisted.logged.email)
  const logging = useSelector((state: RootState) => state.persisted.logging.value)

  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLogged(true)
      setIsLogging(false);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  async function signInWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      const user = result.user;
 
    } catch (error) {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.customData.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
 
    }
  }


  const handleBgClick  = () => {
    setIsLogging(false);
  }

  const handleBoxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  }


  return (
    < >
    <div className={`flex w-screen h-screen text-[#032B41] `}>
      
      <SidebarLeft 
      />
      <div className="w-full h-full">
        <SidebarSearch />
        <div className="flex  "> 
            {logged ? 
            <div className="ml-40 mr-40 w-full">
            <div className="pt-10 font-bold text-4xl">
              <div className="border-b-[#E1E7EA] border-b-1 pb-4 "> Settings </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex flex-col mt-6 pb-4 mb-4 border-b-[#E1E7EA] border-b-1 w-full">
                <div className="font-bold text-xl"> Your Subscription plan</div>
                <div className="pb-2 font-semibold pt-1"> {subLevel.slice(0, 1).toUpperCase() + subLevel.slice(1)} </div>
                <Link href="/choose-plan" className="bg-[#2BD97C] text-center font-semibold pt-2 pb-2 mr-240  rounded-sm"> Upgrade to Premium </Link>
              </div>
              <div>
                <div className="font-bold text-xl"> Email </div>
                <div> {uEmail ? uEmail : "An error has occured, email unfound."} </div>
              </div>
            </div>
          </div> : <div className="w-full">
              <div className="pt-10 font-bold text-4xl">
                <div className="border-b-[#E1E7EA] border-b-1 pb-4 ml-40 mr-40"> Settings </div>
              </div>
              <div className="flex flex-col items-center">
                <Image src='/login.png' alt="login picture" height={500} width={500}/>
                <div className="text-2xl font-bold"> Log in to your account to see your library. </div>
                <div className="text-center font-semibold mt-4 pt-2 pb-2 pl-16 pr-16 rounded-sm bg-[#2BD97C] "> Login </div>
              </div>
            </div>}
        </div>
      </div>
    </div>
    {logging && ( 
      <Login />
  )};
  </>
  )
}
