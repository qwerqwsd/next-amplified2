"use client";
import "./../app/globals.css";



import axios from "axios";
import React, { useEffect } from 'react';
import { BiSolidUser } from 'react-icons/bi';
import { NavComponent } from '../components/nav';
import { useAuth } from '../hooks/useAuth';

interface UserInfo {
  username: string;
  email: string;
}

interface UseMyPageReturn {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  logout: () => void;
  login: (username: string, password: string) => Promise<void>; // Include login in the return type
}

const useMyPage = (): UseMyPageReturn => {
  const { isLoggedIn, userInfo, logout, login } = useAuth() || { isLoggedIn: false, userInfo: null, logout: () => {}, login: async () => {} };

  return {
    isLoggedIn,
    userInfo,
    logout,
    login, 
  };
};



const instance_th = axios.create({
  baseURL: "https://www.taehyun35802.shop",
});


const MyPage: React.FC = () => {
  const { isLoggedIn, userInfo, logout } = useMyPage();





  // const MyPageFunction = async (date: string) => {


  //   const apiUrl = `/mypage`;
  //   try {
  //     const response = await instance_th.get(apiUrl, {
  //       params: {
  //         customer: userInfo ? userInfo.email
  //       },
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     const result = response.data;

  //     // Extract available times from the result
  //     const availability: string[] = result
  //       .filter(
  //         (timeSlot: { isReservation: boolean }) => !timeSlot.isReservation
  //       )
  //       .map((timeSlot: { time: string }) => timeSlot.time);

  //   } catch (error) {
  //     console.error("Error occurred:", error);
  //   }
  // };





  return (
    <>
      <main>
        <NavComponent isLoggedIn={isLoggedIn} logout={logout} username={userInfo ? userInfo.username : ''} />
        <main
          className="flex min-h-screen flex-col wrap items-center"
          style={{ padding: "56px 0 0 0" }}
        >
          <div className="flex w-11/12 md:w-10/12 flex gap-x-4 mt-16 flex-col gap-4">
            <div className="flex gap-4 ">
              <BiSolidUser className="text-9xl rounded-full bg-white w-40 h-40" />
              <div className="flex-col items-top">
                <h1>{userInfo ? userInfo.username : '사용자 이름'}</h1>
                <h3>{userInfo ? userInfo.email : '정보 없음'}</h3>
              </div>
            </div>
            <div className="bg-white w-full min-h-80 rounded-2xl divide-x divide-gray-200 flex">
              <ul className="flex-col divide-y divide-gray-200 min-w-40">
                <li>
                  <button className="px-4 py-2 text-center w-full h-full">
                    <h2>결제내역</h2>
                  </button>
                </li>
                <li>
                  <button className="px-4 py-2 text-center w-full h-full">
                    <h2>예약확인</h2>
                  </button>
                </li>
                <li>
                  <button className="px-4 py-2 text-center w-full h-full">
                    <h2>별지도</h2>
                  </button>
                </li>
              </ul>
              <div className="flex w-full ml-1 h-80 bg-red-100"></div>
            </div>
          </div>
        </main>
      </main>
    </>
  );
};

export default MyPage;