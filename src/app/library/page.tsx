'use client'

import Image from "next/image";
import  SidebarLeft  from '../components/sidebarLeft';
import SidebarSearch from '../components/sidebarSearch';
import Login from '../components/login';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../lib/store';
import { setLogged, setUEmail, setUName } from '@/lib/features/loggedSlice';
import { setLogging } from "@/lib/features/loggingSlice";
import { setActive } from "@/lib/features/activeSlice";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { onSnapshot, collection, getDocs } from "firebase/firestore";
import Link from "next/link";

const auth = getAuth(app);
const db = getFirestore();

export default function ForYou() {

  const [favorites, setFavorites] = useState<any[]>([]);

  const dispatch = useDispatch();

  const logged = useSelector((state: RootState) => state.persisted.logged.value);
  const logging = useSelector((state: RootState) => state.persisted.logging.value);

     const fetchFavorites = async () => {
    const user = auth.currentUser;
    if (!user) return [];
  
    const favsRef = collection(db, `users/${user.uid}/favorites`);
    const snapshot = await getDocs(favsRef);
  
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  };
  

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogged(true);
        fetchFavorites().then((favorites) => setFavorites(favorites));
        fetchFavorites().then((favorites) => console.log(favorites));
      } else {
        setLogged(false);
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    < >
    <div className={`flex w-screen h-screen text-[#032B41] `}>
      
      <SidebarLeft 
      />
      <div className="w-full h-full">
        <SidebarSearch />
        <div>
          {logged ? <div className="w-full flex flex-col ml-64 mt-12">
            <div> 
            <div className="text-2xl font-semibold mb-2"> Saved books </div>
            <div className="font-light"> {favorites.length} items</div>
             <div className="flex w-240 overflow-hidden"> 
                            <div className="flex flex-row gap-4">
                              {!favorites ? <></> :
                              favorites.map((book) => (
                                  <Link href={`/books/${book.id}`} key={book.id} className="hover:bg-gray-200 shrink-0 p-4 w-50 flex flex-col ml-4 mr-4 ">
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
            <div> 
            <div className="text-2xl font-semibold mb-2"> Finished </div>
            <div className="font-light"> {favorites.length} items</div>
             <div className="flex w-240 overflow-hidden"> 
                            <div className="flex flex-row gap-4">
                              {!favorites ? <></> :
                              favorites.map((book) => (
                                  <Link href={`/books/${book.id}`} key={book.id} className="hover:bg-gray-200 shrink-0 p-4 w-50 flex flex-col ml-4 mr-4 ">
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
          : <div className="flex flex-col w-full items-center pt-12">
          <Image src='/login.png' alt="login picture" height={500} width={500}/>
          <div className="text-2xl font-bold"> Log in to your account to see your library. </div>
          <div onClick={() => dispatch(setLogging(true))} className="cursor-pointer font-semibold mt-4 pt-2 pb-2 pr-16 pl-16 rounded-sm bg-[#2BD97C] "> Login </div>
          </div> }
        </div>
      </div>
    </div>
    {logging && ( 
      <Login />
  )};
  </>
  )
}
