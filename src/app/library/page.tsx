'use client'

import Image from "next/image";
import  SidebarLeft  from '../components/sidebarLeft';
import SidebarSearch from '../components/sidebarSearch';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);


export default function ForYou() {
  const [active, setActive] = useState<string>("my")
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
        <div>
          {logged ? <></>
          : <div className="flex flex-col w-full items-center pt-12">
          <Image src='/login.png' alt="login picture" height={500} width={500}/>
          <div className="text-2xl font-bold"> Log in to your account to see your library. </div>
          <div className="font-semibold mt-4 pt-2 pb-2 pr-16 pl-16 rounded-sm bg-[#2BD97C] "> Login </div>
          </div> }
        </div>
      </div>
    </div>
    {isLogging && ( 
      <div
      className="fixed inset-0 bg-black/75  flex items-center justify-center z-50"
      onClick={handleBgClick}
      >
      <form
        className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-96"
        onClick={handleBoxClick}
        onSubmit={(e) => {e.preventDefault(); handleLogin(email, password);}}
      >
        <h2 className="text-xl font-semibold mb-4">Log in to Summarist</h2>
        <button onClick={() => handleLogin('test@email.com', "123456")} className="cursor-pointer mt-2 mb-2 w-full bg-[#25396B] text-white py-2 rounded">
          Login as a Guest
        </button>
        <div className="flex mb-2 mt-2 w-full items-center justify-center"> 
          <div className="border-1 border-gray-300 w-full mr-5"> </div>
          <div> or </div>
          <div className="border-1 border-gray-300 w-full ml-5 "> </div>
        </div>
        <button onClick={signInWithGoogle} className="w-full mt-2 mb-2 cursor-pointer bg-[#4285F4] text-white py-2 rounded">
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => handleLogin(email, password)}className="w-full bg-[#2BD97C] text-black py-2 rounded">
          Login
        </button>
        <div className="text-[#1191E9] mt-4 mb-2"> Forgot your password?</div>
        <div className="text-[#1191E9]"> Don't have an account? </div>
      </form>
    </div>
  )};
  </>
  )
}
