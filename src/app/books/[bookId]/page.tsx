'use client'

import Image from "next/image";
import Link from "next/link";

import { useParams } from "next/navigation"
import { useGetBookByIdQuery } from "@/lib/features/booksSlice";
import  SidebarLeft  from '../../components/sidebarLeft';
import SidebarSearch from '../../components/sidebarSearch';
import Login from '../../components/login';
import { TiMicrophoneOutline } from "react-icons/ti";
import { GiOpenBook } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../lib/store';
import { setLogging } from "@/lib/features/loggingSlice";
import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { onSnapshot, collection, getDocs } from "firebase/firestore";



const db = getFirestore();
const auth = getAuth();

export default function BookPage() {
    const params = useParams()
    const id = params.bookId

    const logging = useSelector((state: RootState) => state.persisted.logging.value)
    const logged = useSelector((state: RootState) => state.persisted.logged.value)

    const dispatch = useDispatch();

 
const [favorites, setFavorites] = useState<string[]>([]);

   useEffect(() => {
  const user = auth.currentUser;
  if (!user) return;

  const favsRef = collection(db, `users/${user.uid}/favorites`);

  const unsubscribe = onSnapshot(favsRef, (snapshot) => {
    const favIds = snapshot.docs.map((doc) => doc.id);
    setFavorites(favIds);
  });

  return () => unsubscribe();
}, []);

    function getAudioDuration(url: string): Promise<number> {
        return new Promise((resolve, reject) => {
          const audio = new Audio();
          audio.src = url;
          audio.preload = "metadata";
          audio.onloadedmetadata = () => resolve(audio.duration);
          audio.onerror = () => reject("Unable to load audio");
        });
      }

      const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
      };

      function AudioDurationDisplay({ audioLink }: { audioLink: string }) {
        const [duration, setDuration] = useState<number | null>(null);
      
        useEffect(() => {
          getAudioDuration(audioLink)
            .then(setDuration)
            .catch(() => setDuration(0));
        }, [audioLink]);
      
        return (
          <div className="flex items-center font-semibold"> 
            <FaRegClock size={25}/>
            <div className="pl-2">{duration !== null ? formatTime(duration) : "Loading..."}</div>
          </div>
        );
      }


    const { data: bookData, isLoading, error } = useGetBookByIdQuery(id as string, {
        skip: typeof id !== 'string',
      });

       
const toggleFavorite = async (book) => {
  const user = auth.currentUser;
  if (!user) return;

  const favRef = doc(db, `users/${user.uid}/favorites/${book.id}`);
  const snapshot = await getDoc(favRef);

  if (snapshot.exists()) {
    await deleteDoc(favRef);
  } else {
    await setDoc(favRef, book);
  }
};


      if (!bookData) return <div> Loading...</div>

    return(
    <>
        <div className={`flex w-screen h-screen text-[#032B41] flew-grow `}>
            <SidebarLeft />
            <div className="w-full h-full  overflow-y-auto">
            <SidebarSearch />
            
            <div className="flex justify-start ml-60">
                <div>
                    <div className="mt-10 text-3xl font-bold"> {bookData.title} </div>
                    <div className="mt-4 font-bold"> {bookData.author} </div>
                    <div className="mt-4 text-xl font-light"> {bookData.subTitle} </div>
                    <hr className=" border-gray-200 mt-4 border-1"/>
                    <div className="flex mt-2 ">
                        <div className="flex flex-col pr-14 "> 
                            <div className="flex items-center font-semibold pb-2"> 
                                <FaRegStar size={25}/>
                                <div className="pl-2"> {bookData.averageRating}</div>
                                <div  className="pl-2"> ({bookData.totalRating}) ratings </div>
                            </div>
                            <div className="flex items-center font-semibold"> 
                                <TiMicrophoneOutline size={25}/>
                                <div className="pl-2"> Audio & Text </div>
                            </div>
                        </div>
                        <div className="flex flex-col ">
                            <div className="pb-2 flex items-center font-semibold"> 
                                    <AudioDurationDisplay audioLink={bookData.audioLink} />
                            </div>
                            <div className="flex items-center font-semibold"> 
                                    <HiOutlineLightBulb size={25}/>
                                    <div className="pl-2"> {bookData.keyIdeas} Key Ideas</div>
                            </div>
                        </div>
                    </div>
                    <hr className=" border-gray-200 mt-4 border-1"/>
                    <div className="mt-2 flex ">
                        {logged ?    <Link href={`/player/${id}`}>
                            <button className="flex items-center rounded-sm pl-10 pr-10 cursor-pointer pt-3 pb-3 text-white  bg-[#032B41] hover:bg-[#355567]"> 
                                <GiOpenBook size={20} />
                                <div className="pl-2"> Read </div>
                            </button>
                        </Link> :<button onClick={() => dispatch(setLogging(true))} className="flex items-center rounded-sm pl-10 pr-10 cursor-pointer pt-3 pb-3 text-white  bg-[#032B41] hover:bg-[#355567]"> 
                                <GiOpenBook size={20} />
                                <div className="pl-2"> Read </div>
                            </button>
                        }
                        { logged ?  <Link href={`/player/${id}`}>
                        <button className="ml-4 flex items-center rounded-sm pl-10 cursor-pointer pr-10 pt-3 pb-3 text-white  bg-[#032B41] hover:bg-[#355567]"> 
                            <TiMicrophoneOutline size={20} />
                            <div className="pl-2"> Listen </div>
                        </button>
                        </Link> :  
                        <button onClick={() => dispatch(setLogging(true))} className="ml-4 flex items-center rounded-sm pl-10 cursor-pointer pr-10 pt-3 pb-3 text-white  bg-[#032B41] hover:bg-[#355567]"> 
                            <TiMicrophoneOutline size={20} />
                            <div className="pl-2"> Listen </div>
                        </button>
                        }
                                    
                    </div>
                    <div className="flex mt-4 font-semibold items-center cursor-pointer group"> 
                        {logged ? <>
                           {favorites.includes(bookData.id) ? <FaBookmark onClick={() => toggleFavorite(bookData)} size={30} className={`fill-[#2CA2E8] group-hover:fill-[#0442B3] `}/>
                            :  <CiBookmark onClick={() => toggleFavorite(bookData)} size={30} className={`fill-[#2CA2E8] group-hover:fill-[#0442B3] `}/>}
                            <div onClick={() => toggleFavorite(bookData)} className="text-[#2CA2E8] text-xl group-hover:text-[#0442B3]"> Add title to My Library </div>
                        </> : <div className="flex" onClick={() => dispatch(setLogging(true))}>
                            <CiBookmark size={30} className="fill-[#2CA2E8] group-hover:fill-[#0442B3] "/>
                            <div className="text-[#2CA2E8] text-xl group-hover:text-[#0442B3]"> Add title to My Library </div>
                        </div>}
                    </div>
                    <div className="font-semibold text-lg mt-4"> What&apos;s it about?</div>
                    <div className="flex mt-4 justfy-between">
                        {bookData.tags.map((tag) => {
                            return (
                                <div className="pl-3 pr-3 font-semibold" key={tag} > {tag} </div>
                            )
                        })}
                    </div>
                <div className="mt-4 max-w-200">
                   {bookData.bookDescription}             
                </div>
                <div className="mt-3 font-semibold text-lg"> About the author</div>
                <div className="mt-3 mb-8 max-w-200"> 
                    {bookData.authorDescription}
                </div>
            </div>
            <Image src={bookData.imageLink} alt={bookData.title} width={550} height={100} className=" h-80 pr-60 pt-10"/>
            </div>
        </div>
        </div>
        {logging && ( 
        <Login />
  )};
    </>
    )
}