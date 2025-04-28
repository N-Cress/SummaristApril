'use client'

import Image from "next/image";
import  SidebarLeft  from '../components/sidebarLeft';
import SidebarSearch from '../components/sidebarSearch';
import Login from '../components/login';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);


export default function ForYou() {
  const [active, setActive] = useState<string>("for")
  const [logged, setLogged] = useState<boolean>(false)
  const [isLogging, setIsLogging] = useState<boolean>(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      const token = credential.accessToken;
      const user = result.user;
 
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
 
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
      
      <SidebarLeft active={active} setActive={setActive} logged={logged} setLogged={setLogged}
      isLogging={isLogging} setIsLogging={setIsLogging}
      />
      <div className="w-full h-full">
        <SidebarSearch />
        <div className="flex  "> 
            {logged ? <></>
            : 
            <></>}
        </div>
      </div>
    </div>
    {isLogging && ( 
      <Login setLogged={setLogged} setIsLogging={setIsLogging}/>
  )};
  </>
  )
}
