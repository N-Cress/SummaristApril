import Image from "next/image";

import { TiHomeOutline } from "react-icons/ti";
import { CiBookmark } from "react-icons/ci";
import { FaPenClip } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineCog } from "react-icons/hi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";

import { app } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../lib/store';
import { setActive } from '../../lib/features/activeSlice';
import { setLogged } from "@/lib/features/loggedSlice";
import { setLogging } from "@/lib/features/loggingSlice";

import { getAuth } from 'firebase/auth';
import Link from "next/link";

const auth = getAuth(app);

type Props = {
  setTextSize: (textSize: string) => void
}

const SidebarPlayer: React.FC<Props> = ({}) => {

  const active = useSelector((state: RootState) => state.persisted.active.value)
  const logged = useSelector((state: RootState) => state.persisted.logged.value)

 
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch((setLogged(false)));
    auth.signOut();
  }

    return(
        <div className="w-54 flex flex-col justify-between h-full pb-4 pr-4 pt-4 sidebar">
                <div className="flex flex-col ">
                  <Image src="/logo.png" className="pl-4 sidebar_image mb-10" alt="Summarist Logo" height={220} width={220}/>
                  <Link href="/for-you">
                    <div onClick={() => dispatch((setActive("for"))) } className={`cursor-pointer flex p-4 border-l-green-400 pl-3 items-center ${ active === "for" ? "border-l-4" : "pl-2"}`}>
                      <TiHomeOutline className="icons"/>
                      <div className="pl-2 text-lg"> For you </div>
                    </div>
                  </Link>
                  <Link href="/library">
                    <div onClick={() => dispatch((setActive("my")))  }className={`cursor-pointer flex p-4 border-l-green-400 pl-3 items-center ${ active === "my" ? "border-l-4" : "pl-2"}`}>
                      <CiBookmark className="icons"/>
                      <div className="pl-2 text-lg"> My Library </div>
                    </div>
                  </Link>
                  <div className={`cursor-not-allowed flex p-4 border-l-green-400 pl-3 items-center ${ active === "highlights" ? "border-l-4" : "pl-2"}`}>
                    <FaPenClip className="icons"/>
                    <div className="pl-2"> Highlights </div>
                  </div>
                  <div className={`cursor-not-allowed flex p-4 border-l-green-400 pl-3 items-center ${ active === "search" ? "border-l-4" : "pl-2"}`}>
                    <IoIosSearch className="icons" />
                    <div className="pl-2"> Search </div>
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <Link href="/settings">
                    <div onClick={() => dispatch((setActive("settings"))) }className={`cursor-pointer flex p-4 border-l-green-400 pl-3 items-center ${ active === "settings" ? "border-l-4" : "pl-2"}`}>
                      <HiOutlineCog className="icons" />
                      <div className="pl-2"> Settings </div>
                    </div>
                  </Link>
                  <div className={`cursor-not-allowed flex p-4 border-l-green-400 pl-3 items-center ${ active === "help" ? "border-l-4" : "pl-2"}`}>
                    <IoIosHelpCircleOutline className="icons" />
                    <div className="pl-2"> Help & Support </div>
                  </div>
                  {logged ? 
                    <div onClick={() => handleLogout()} className={`cursor-pointer flex p-4 border-l-green-400 pl-3 items-center ${ active === "login" ? "border-l-4" : "pl-2"}`}>
                    <IoIosLogIn className="icons" />
                    <div className="pl-2"> Logout </div>
                    </div> :
                    <div onClick={() => dispatch((setLogging(true)))} className={`cursor-pointer flex p-4 border-l-green-400 pl-3 items-center ${ active === "login" ? "border-l-4" : "pl-2"}`}>
                    <IoIosLogIn className="icons" />
                    <div className="pl-2"> Login </div>
                    </div>
                  }
                </div>
              </div>
    )
}

export default SidebarPlayer;