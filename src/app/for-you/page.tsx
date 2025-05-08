'use client'

import Image from "next/image";
import  SidebarLeft  from '../components/sidebarLeft';
import SidebarSearch from '../components/sidebarSearch';
import Login from '../components/login';
import Link from "next/link";

import { useEffect, useState } from 'react';
import { FaCirclePlay } from "react-icons/fa6";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../lib/store';
import { setLogged, setUEmail, setUName } from '@/lib/features/loggedSlice';
import { setLogging } from "@/lib/features/loggingSlice";

import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase';
import { useGetSuggestedBooksQuery, useGetSelectedBooksQuery, useGetRecommendedBooksQuery } from "@/lib/features/booksSlice";

const auth = getAuth(app);


export default function ForYou() {
  const [active, setActive] = useState<string>("for")

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logged = useSelector((state: RootState) => state.persisted.logged.value)
  const logging = useSelector((state: RootState) => state.persisted.logging.value)

  const {data: selectedData, isLoading: selectedLoading} = useGetSelectedBooksQuery()
  const {data: recommendedData, isLoading: recommendedLoading} = useGetRecommendedBooksQuery()
  const {data: suggestedData, isLoading: suggestedLoading} = useGetSuggestedBooksQuery()


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



  return (
    < >
    <div className={`flex w-screen h-screen text-[#032B41] flew-grow `}>
      
      <SidebarLeft 
      />
      <div className="w-full h-full  overflow-y-auto">
    
        <SidebarSearch />

        <div className="flex-grow -auto ml-60 pt-10 pr-6"> 
            <div className="flex flex-col">
              <div className="text-2xl font-semibold mb-2"> Selected just for you </div>
              <div className="">
                {!selectedData ? <></> : 
                <Link href={`/books/${selectedData[0].id}`} className="flex p-4 rounded-sm bg-[#FBEFD6] w-150 h-full">
                  <div className="w-50"> {selectedData[0].subTitle }</div>
                  <hr  className="h-full ml-8 mr-4 border-gray-300 border-1"/>
                  <div className="flex">
                    <Image src={selectedData[0].imageLink} width={160} height={200} alt="book image" />
                    <div>
                      <div className="font-bold"> {selectedData[0].title}</div>
                      <div> {selectedData[0].author} </div>
                      <div className="flex mt-4 items-center"> 
                        <FaCirclePlay size={40}/>
                        <div className="ml-2 text-xl"> 3:23 </div>
                      </div>
                    </div>
                  </div>
                </Link>}
              </div>
              <div className="text-2xl font-semibold mb-2"> Recommended for you </div>
              <div className="text-base"> We think you&apos;ll like these </div>
              <div className="flex w-260 overflow-hidden"> 
                <div className="flex flex-row gap-4">
                  {!recommendedData ? <></> :
                  recommendedData.map((book) => (

                      <Link href={`/books/${book.id}`} key={book.id} className="hover:bg-gray-200 shrink-0 p-4 w-45 flex flex-col ml-4 mr-4 ">
                        {book.subscriptionRequired ? <div className="mt-2 text-end pb-2"> <button className="rounded-2xl text-[10px] pb-1 pt-1 pl-2 pr-2 text-white bg-blue-950"> Premium </button> </div> : <div className="mt-11"> </div>}
                        <Image src={book.imageLink} alt={book.title} width={600} height={100} className=" h-40" />
                        <div className="font-bold"> {book.title} </div>
                        <div className="font-light"> {book.author} </div>
                        <div className="text-sm"> {book.subTitle}</div>
                        <div>
                          
                        </div>
                      </Link>
                  ))}        
                </div>
              </div>
              <div className="text-2xl font-semibold mb-2"> Suggested books </div>
              <div className="text-base"> Browse these books </div>
              <div className="flex w-260 mb-20 overflow-hidden"> 
              <div className="flex flex-row gap-4">
              { !suggestedData ? <></> :
                  suggestedData.map((book) => (

                      <Link href={`/books/${book.id}`} key={book.id} className="hover:bg-gray-200 p-4 shrink-0 w-45 flex flex-col ml-4 mr-4 ">
                        {book.subscriptionRequired ? <div className="mt-2 text-end pb-2"> <button className="rounded-2xl text-[10px] pb-1 pt-1 pl-2 pr-2 text-white bg-blue-950"> Premium </button> </div> : <div className="mt-11"> </div>}
                        <Image src={book.imageLink} alt={book.title} width={600} height={100} className=" h-40" />
                        <div className="font-bold"> {book.title} </div>
                        <div className="font-light"> {book.author} </div>
                        <div className="text-sm"> {book.subTitle}</div>
                        <div>
                          
                        </div>
                      </Link>
                  ))}      
                </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    {logging && ( 
      <Login />
  )};
  </>
  )
}
