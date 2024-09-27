"use client";
import "./../app/globals.css";

import Link from "next/link";
import { useState } from "react";
import React from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { FaBookReader } from "react-icons/fa";
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

type NavComponentProps = {
  className?: string;
  isLoggedIn: boolean; // Make this required if you are always passing it
  username?: string; // Optional, since a user might not be logged in
  logout: () => void; // Ensure this is defined
};

export const NavComponent: React.FC<NavComponentProps> = ({
  className,
}) => {
  const { isLoggedIn, userInfo, logout} = useAuth();

  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setUserMenuOpen(!isUserMenuOpen);

  const handleLogout = () => {
    logout(); // 로그아웃 처리
    router.push('/start'); // 로그아웃 후 /start로 이동
  };


  return (
    <div className={className}>
      <nav className="bg-white dark:bg-gray-900 fixed z-20 top-2 md:w-[80%] w-[90%] pl-2 py-2 left-1/2 transform -translate-x-1/2 border-b border-gray-200 dark:border-gray-600 rounded-2xl shadow">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">
          <Link href="/start" className="flex items-center space-x-3 rtl:space-x-reverse">
            <FaBookReader className="text-2xl" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">linkedbook</span>
          </Link>
          
          <div className="flex items-center md:order-2">
            <div className="hidden md:flex md:items-center md:space-x-8">
              <ul className="flex flex-row font-medium space-x-8">
                <li>
                  <a href="#" className="text-gray-900 hover:text-green-700 dark:text-white dark:hover:text-green-500">이용 방법</a>
                </li>
                <li>
                  <Link href="/map" className="text-gray-900 hover:text-green-700 dark:text-white dark:hover:text-green-500">책방 지도</Link>
                </li>
                <li>
                  <Link href="/app" className="text-gray-900 hover:text-green-700 dark:text-white dark:hover:text-green-500">책방 찾기</Link>
                </li>
              </ul>
            </div>
            
            {isLoggedIn ? (
              <div className="relative object-center">
                <button onClick={toggleUserMenu} className="text-3xl text-green-600 hover:text-green-700 focus:outline-none ml-4 my-auto">
                  <LuUserCircle2 />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link href="/mypage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">마이 페이지</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">로그 아웃</button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="ml-8 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                로그인
              </Link>
            )}
            
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center mt-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ml-2"
              aria-controls="navbar-default"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          
          <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:hidden`} id="navbar-default">
            <ul className="flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">이용 방법</a>
              </li>
              <li>
                <Link href="/map" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">책방 지도</Link>
              </li>
              <li>
                <Link href="/app" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">책방 찾기</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavComponent;