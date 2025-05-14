import { IoIosSearch } from "react-icons/io";
import { useGetBookBySearchQuery } from "@/lib/features/booksSlice";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa";

export default function SidebarSearch() {
    const [query, setQuery] = useState("")
    const [dataSet, setDataSet] = useState(null)

        function resetQuery() {
            setQuery("")
        }

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
              <div className="flex items-center font-light"> 
                <FaRegClock size={15}/>
                <div className="pl-1">{duration !== null ? formatTime(duration) : "Loading..."}</div>
              </div>
            );
          }

    const { data: bookData, isLoading, error } = useGetBookBySearchQuery(query, {
        skip: !query,
    });

    useEffect(() => {
    console.log(bookData);
    }, [bookData]);

    return(
        <div className="border-b-[#E1E7EA] border-b-1 h-1/12 pr-60">
            <div className="flex h-full items-center w-full justify-end relative">
                <input value={query} onChange={(e) => setQuery(e.target.value)} className="border-[#E1E7EA] p-2 border-1 h-10 rounded-r-none text-sm pl-4 rounded-xl pr-42" placeholder="Search for books"/> 
                {!bookData ? <IoIosSearch className="border-[#E1E7EA] border-1 rounded-l-none h-10 w-10 p-2 cursor-pointer rounded-xl"/> : <div onClick={resetQuery} className="border-[#E1E7EA] cursor-pointer border-1 text-xl flex items-center justify-center font-semibold rounded-l-none h-10 w-10 p-2 rounded-xl"> X </div> }
                <div className={`border-1 border-gray-200 z-100 bg-white absolute top-18 overflow-y-scroll ${bookData ? `h-200` : ``}`}>
                {bookData && query && bookData.map((book) => (
                      <Link href={`/books/${book.id}`} key={book.id} className="hover:bg-gray-200 shrink-0 p-4 w-100 items-center flex  ml-4 mr-4 ">
                        <Image src={book.imageLink} alt={book.title} width={100} height={100} className=" h-20 pr-4" />
                        <div>
                            <div className="font-bold"> {book.title} </div>
                            <div className="font-light"> {book.author} </div>
                            <AudioDurationDisplay audioLink={book.audioLink} />
                        </div>
                        <div>
                        </div>
                      </Link>
                  ))}   
            </div>
            </div>
        </div>
    )
}