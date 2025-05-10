'use client'

import Image from "next/image";

import { RiPlantFill } from "react-icons/ri";
import { IoIosDocument } from "react-icons/io";
import { FaHandshake } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function ChoosePlan() {
    const [selectedPlan, setSelectedPlan] = useState("yearly")
    const [qOne, setQOne] = useState(true)
    const [qTwo, setQTwo] = useState(false)
    const [qThree, setQThree] = useState(false)
    const [qFour, setQFour] = useState(false)



    return (
        <div className="flex flex-col relative items-center  min-h-screen h-[100%] overflow-y-auto ">
            <div className="-z-10 absolute top-0 border-2 bg-[#032B41] border-b-blue-[#032B41] rounded-b-[256px] w-full h-140"> </div>
            <div className="z-10 text-center mt-18 text-white font-bold text-5xl w-200"> Get unlimited access to many amazing books to read</div>
            <div className="z-10 pt-8 pb-8 mb-7 text-white text-xl text-center"> Turn ordinary moments into amazing learning opportunities </div>
            <Image src="/pricing-top.png" alt="Pricing image" width={325} height={400} className=" rounded-t-[50%] h-80"></Image>
            <div className="flex mt-12 mb-12">
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
            <div className="">
                <div className="mb-4 text-center text-[#032B41] text-3xl font-bold "> Choose the plan that fits you</div>
                <div  onClick={() => setSelectedPlan("yearly")} className={`cursor-pointer border-4 mt-2 rounded-lg pr-120 pt-3 pb-3 ${selectedPlan === "yearly" ? `border-[#2BE080]` : `border-[#BAC8CE]`}`}>
                    <div className="flex">
                        <div className={`h-1 w-1 p-2 mt-2 ml-4 mr-4 border-1 rounded-2xl ${selectedPlan === "yearly" ? `bg-black` : ``}`}>
                            
                        </div>
                        <div className="ml-2">
                            <div className="font-semibold pb-2 text-xl"> Premium Plus Yearly</div>
                            <div className="font-semibold pb-2 text-2xl"> $99.99/year </div>
                            <div className="font-xs text-[#6B758B]"> 7-day free trial included</div>
                        </div>
                    </div>
                    
                </div>
                <div className="flex mb-2 mt-2 w-full items-center justify-center"> 
                    <div className="border-1 border-gray-300 w-1/8 mr-5"> </div>
                    <div> or </div>
                    <div className="border-1 border-gray-300 w-1/8 ml-5 "> </div>
                </div>
                <div onClick={() => setSelectedPlan("monthly")} className={`cursor-pointer border-4 mt-2 rounded-lg pr-120 pt-3 pb-3 ${selectedPlan === "monthly" ? `border-[#2BE080]` : `border-[#BAC8CE]`}`}>
                    <div className="flex">
                        <div className={`h-1 w-1 p-2 mt-2 ml-4 mr-4 border-1 rounded-2xl ${selectedPlan === "monthly" ? `bg-black` : ``}`}>

                        </div>
                        <div className="ml-2">
                            <div className="font-semibold pb-2 text-xl"> Premium Monthly</div>
                            <div className="font-semibold pb-2 text-2xl"> $9.99/month </div>
                            <div className="font-xs text-[#6B758B]"> No trial included</div>
                        </div>
                    </div>
                </div>
                <div className="sticky bg-white w-full bottom-8 text-center pt-8">
                    <div className="bg-[#2BE080] rounded-sm p-2 mr-50 ml-50"> {selectedPlan === "yearly" ? "Start your free 7-day trial" : "Start your first month"} </div>
                </div>
                <div className="sticky bottom-0 pb-4  bg-white w-full text-center text-xs mt-2 text-[#6B758B]"> {selectedPlan === "yearly" ? "Cancel your trial at any time before it ends, and you won't be charged." : "30-day money back guarantee, no questions asked."} </div>
            </div>
            <div>
                <div className="border-b border-gray-300 mt-4 py-4 transition-all ">
                    <button
                        onClick={() => setQOne(!qOne)}
                        className="cursor-pointer w-full text-left font-semibold text-2xl flex justify-between "
                    >
                        How does the free 7-day trial work?
                        <span className={`cursor-pointer transition-all duration-300 ease-in-out text-4xl ${qOne ? 'rotate-180' : 'rotate-0'}`}> ^ </span>
                    </button>
                    <div
                        className={`grid transition-all duration-300 ease-in-out ${
                        qOne ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
                        } overflow-hidden text-gray-700 text-base`}
                    >
                        <div className="mt-2 max-w-300 text-gray-700 text-base">
                        Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="border-b border-gray-300 mt-4 py-4 transition-all">
                    <button
                        onClick={() => setQTwo(!qTwo)}
                        className="w-full cursor-pointer text-left font-semibold text-2xl flex justify-between "
                    >
                        Can I switch subscriptions from monthly to yearly, or yearly to monthly?
                        <span className={`cursor-pointer transition-all duration-300 ease-in-out text-4xl ${qTwo ? 'rotate-180' : 'rotate-0'}`}> ^ </span>
                    </button>
                    <div
                        className={`grid transition-all duration-300 ease-in-out ${
                        qTwo ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
                        } overflow-hidden text-gray-700 text-base`}
                    >
                        <div className="mt-2 max-w-300 text-gray-700 text-base">
                        While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="border-b border-gray-300 mt-4 py-4 transition-all">
                    <button
                        onClick={() => setQThree(!qThree)}
                        className="cursor-pointer w-full text-left font-semibold text-2xl flex justify-between "
                    >
                        What&apos;s included in the Premium plan?
                        <span className={`cursor-pointer transition-all duration-300 ease-in-out text-4xl ${qThree ? 'rotate-180' : 'rotate-0'}`}> ^ </span>
                    </button>
                    <div
                        className={`grid transition-all duration-300 ease-in-out ${
                        qThree ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
                        } overflow-hidden text-gray-700 text-base`}
                    >
                        <div className="mt-2 max-w-300 text-gray-700 text-base">
                        Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="border-b border-gray-300 mt-4 py-4 transition-all">
                    <button
                        onClick={() => setQFour(!qFour)}
                        className="cursor-pointer w-full text-left font-semibold text-2xl flex justify-between "
                    >
                        Can I cancel during my trial or subscription?
                        <span className={`cursor-pointer transition-all duration-300 ease-in-out text-4xl ${qFour ? 'rotate-180' : 'rotate-0'}`}> ^ </span>
                    </button>
                    <div
                        className={`grid transition-all duration-300 ease-in-out ${
                        qFour ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
                        } overflow-hidden text-gray-700 text-base`}
                    >
                        <div className="mt-2 max-w-300 text-gray-700 text-base">
                        You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per dTwo                        </div>
                    </div>
                </div>
            </div>
            <div className="flex mt-20 mb-10 w-3/4 justify-around ">
                <div >
                    <div className="text-lg mb-2 font-bold">Actions</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Summarist Magazine</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Cancel Subscription</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Help</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Contact us</div>
                </div>
                <div >
                    <div className="text-lg mb-2 font-bold">Useful Links</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Pricing</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Summarist Business</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Gift Cards</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Authors & Publishers</div>
                </div>
                <div >
                    <div className="text-lg mb-2 font-bold">Company</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">About</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Careers</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Partners</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Code of Conduct</div>
                </div>
                <div >
                    <div className="text-lg mb-2 font-bold">Other</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Sitemap</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Legal Notice</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Terms of Service</div>
                    <div className="text-gray-700 mb-1 text-sm cursor-not-allowed">Privacy Policies</div>
                </div>
            </div>
            <div className="font-semibold mb-10">
                 Copyright © 2023 Summarist.
            </div>
        </div>
    )
}