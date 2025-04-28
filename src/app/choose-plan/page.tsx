import Image from "next/image";

import { RiPlantFill } from "react-icons/ri";
import { IoIosDocument } from "react-icons/io";
import { FaHandshake } from "react-icons/fa";



export default function ChoosePlan() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="-z-10 absolute top-0 border-2 bg-[#032B41] border-b-blue-[#032B41] rounded-b-[256px] w-full h-140"> </div>
            <div className="z-10 text-center mt-24 text-white font-bold text-4xl w-200"> Get unlimited access to many amazing books to read</div>
            <div className="z-10 pt-8 pb-8 text-white text-xl text-center"> Turn ordinary moments into amazing learning opportunities </div>
            <Image src="/pricing-top.png" alt="Pricing image" width={325} height={400} className=" rounded-t-[50%] h-80"></Image>
            <div className="flex mt-10">
                <div className="flex flex-col items-center text-center">
                    <IoIosDocument style={{color: '#032B41'}} className="w-14 h-14" />
                    <div className="w-48"> <span className="font-semibold text-[#032B41]"> Key Ideas in few min </span> with many books to read</div>
                </div>
                <div className="pr-20 pl-20 flex flex-col items-center text-center">
                    <RiPlantFill style={{color: '#032B41'}} className="w-14 h-14"  />
                    <div className="w-48"> <span className="font-semibold text-[#032B41]"> 3 million </span> people growing with Summarist every day. </div>
                </div>
                <div className="flex flex-col items-center text-center">
                    <FaHandshake style={{color: '#032B41'}} className="w-14 h-14" />
                    <div className="w-48"> <span className="font-semibold text-[#032B41]"> Precise recommendations</span> collections curated by experts. </div>
                </div>
            </div>
            <div>
                <div className="text-[#032B41] text-3xl font-bold mt-8"> Choose the plan that fits you</div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}