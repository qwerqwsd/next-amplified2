"use client";
import "./../app/globals.css";
import Link from "next/link";
import UserPlaceHolder from "../static/UserPlaceHolder.png";
import Image from "next/image";
import { BiSolidUser } from "react-icons/bi";

import { NavComponent } from "../components/nav";
import movie from "../static/movie.gif";
import { useSearchParams } from "next/navigation";
// import awsconfig from './';

import { AppProps } from 'next/app';

const MyPage: React.FC<AppProps> = ({ Component, pageProps }) => {


  return (
    <>
      <main>
      
        <NavComponent />
        <main
          className="flex min-h-screen flex-col wrap items-center"
          style={{ padding: "56px 0 0 0" }}
        >
            <div className="flex w-11/12 md:w-10/12 flex gap-x-4 mt-16 flex-col gap-4">
                
                <div className="flex gap-4 ">            
                    {/* <Image
                    src={UserPlaceHolder}
                    alt="Book recommendation"
                    width={100}
                    height={100}
                    className="aspect-auto rounded-full bg-white p-4"
                    />   */}
                    <BiSolidUser className="text-9xl rounded-full bg-white w-40 h-40"/>
                    <div className="flex-col items-top"><h1>User Name</h1>
                    <h3>some info</h3>
                    </div>
                </div>

                    <div className="bg-white w-full min-h-80 rounded-2xl divide-x divide-gray-200 flex">
                        <ul className="flex-col divide-y divide-gray-200 min-w-40 ">
                        <li className="">
                            <button className="px-4 py-2 text-center w-full h-full">
                            <h2>결제내역</h2>
                            </button></li>
                        <li className=""> <button className="px-4 py-2 text-center w-full h-full"><h2>예약확인</h2></button></li>
                        <li className=""> <button className="px-4 py-2 text-center w-full h-full"><h2>별지도</h2></button></li>
                        </ul>
<div className="flex w-full ml-1 h-80 bg-red-100">


</div>




                    </div>



                 
            </div>
        
            </main>
      </main>
    </>
  );
};

export default MyPage;