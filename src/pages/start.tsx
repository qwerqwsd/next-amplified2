"use client";
import "./../app/globals.css";
import Script from 'next/script';
import axios from "axios";
import Link from "next/link";
import { NavComponent } from "../components/nav";
import Image from "next/image";
import book from "../static/book.png";
import movie from "../static/movie.gif";
import { useAuth } from "../hooks/useAuth";
import React, { useState, useEffect } from "react";
import { AppProps } from "next/app";
import { BiSearch } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { Bookstore } from "../pages/app";
import { BiCurrentLocation, BiChevronUp, BiChevronDown } from "react-icons/bi";
import BookstoreListSkeleton from "../components/BookstoreListSkeleton";
import Gradient from '../components/gradient'

const instance_th = axios.create({
  baseURL: "http://k8s-default-bookstor-601da9da3c-1598983671.ap-northeast-2.elb.amazonaws.com",
});



const Start: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { isLoggedIn, userInfo, logout } = useAuth();
  const [aiClick, setAiClick] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [bookstoreList, setBookstoreList] = useState<Bookstore[]>([]);
  const [aiList, setAiList] = useState<any[]>([]);
  const [showBookstoreList, setShowBookstoreList] = useState<Boolean>(false); // Toggle state for bookstore list
  const [isLoading, setIsLoading] = useState(false);





  
  const categories = [
    "편안한",
    "유럽풍의",
    "맥주",
    "좋은 경치",
    "넣고 싶은 거 넣어",
    "이게 뭐야",
  ];

  const getFacilityInfo = (
    FCLTY_NM: string
  ): { name: string | null; description: string | null } => {
    const foundBookstore = bookstoreList.find(
      (bookstore) => bookstore.FCLTY_NM === FCLTY_NM
    );
    return {
      name: foundBookstore ? foundBookstore.FCLTY_NM : null,
      description: foundBookstore ? foundBookstore.OPTN_DC : null,
    };
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

const handleSearch = async () => {
  const query = inputValue + " " + selectedCategories.join(" ");
  const isKeyword = !inputValue && selectedCategories.length > 0;
  setIsLoading(true)
  console.log("Sending to backend:", {
    searchQuery: inputValue,
    categories: selectedCategories,
    query: query,
    keyword: isKeyword
  });

  try {
    const response = await fetch("/api/recommend", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        numberOfResults: 5,
        keyword: isKeyword
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("Received data:", data);

    setAiList(data);
    setShowBookstoreList(true);
    // console.log(aiList)

  } catch (error) {
    console.error("Error during search:", error);
    // Handle the error appropriately, e.g., show an error message to the user
  }
};

  const buttonVariants = {
    initial: { scale: 1, x: 0 },
    hover: { scale: 0.95, transition: { duration: 0.2 } },
    tap: { scaleX: 0.9, transition: { duration: 0.1 } },
    clicked: { x: "-10%", transition: { duration: 0.3 } }, // Move it further left
  };

  const containerVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        width: { type: "spring", stiffness: 100, damping: 15 },
        opacity: { duration: 0.5 },
      },
    },
    exit: {
      width: 0,
      opacity: 0,
      transition: {
        width: { duration: 0.3 },
        opacity: { duration: 0.3 },
      },
    },
  };


  // const AiSearch = async (date: string) => {

  //   const apiUrl = `/reservation`;
  //   try {
  //     const response = await instance_th.post(apiUrl, {
  //       params: {
  //         bookstore: bookstores.FCLTY_NM,
  //         date: date,
  //       },
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     const result = response.data;

  //     // Extract available times from the result
  //     const availability: string[] = result
  //       .filter((timeSlot: { isReservation: boolean }) => !timeSlot.isReservation)
  //       .map((timeSlot: { time: string }) => timeSlot.time);

  //     setAvailableTimes(availability); // Set available times based on response
  //     setIsAvailabilityError(false);
  //   } catch (error) {
  //     console.error("Error occurred:", error);
  //     setIsAvailabilityError(true);
  //     setAvailableTimes([]); // Reset available times on error
  //   }
  // };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/bookstore.json");
        const data = await response.json();
        setBookstoreList(data);
      } catch (error) {
        console.error("Error fetching bookstore data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
    
    <Script id="jennifer-inline-script" strategy="lazyOnload">
        {`
          (function(j, ennifer) {
              j['dmndata'] = [];
              j['jenniferFront'] = function(args) { window.dmndata.push(args); };
              j['dmnaid'] = ennifer;
              j['dmnatime'] = new Date();
              j['dmnanocookie'] = false;
              j['dmnajennifer'] = 'JENNIFER_FRONT@INTG';
          }(window, '402761ca'));
        `}
      </Script>

<style jsx>{`
  .shining-text {
    background: linear-gradient(
      120deg,        /* Tilted gradient */
      #000000 0%,    /* Black */
      #2e8b57 25%,   /* Darker Mint (Sea Green) */
      #006b3c 50%,   /* Even Darker Mint */
      #2e8b57 75%,   /* Darker Mint (Sea Green) */
      #ffffff 100%   /* White */
    );
    background-size: 200% auto;
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
  }
`}</style>
<main className="relative">
  <div className="z-[999] fixed left-[10vw] right[10vw] justify-center w-full">
    <NavComponent
      className="mx-auto"
      isLoggedIn={isLoggedIn}
      username={userInfo ? userInfo.username : ""}
      logout={logout}
    />
  </div>
        <Gradient className="w-[full] blur-md brightness-150"/>
        <div className="mt-[60px] h-full mx-auto">
          <div className="relative flex items-center justify-center w-screen ">
            <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full">
              <main className="relative w-screen h-screen">
                <div className="flex items-center justify-center w-full h-full ">
                  <div className="absolute flex items-center justify-center w-full h-full">
                    <div className="container flex flex-col md:flex-row md:justify-between items-center mx-auto w-[90%] md:w-[80%]">
                      <div className="flex flex-col justify-center md:w-1/2 w-full md:text-left text-center">
                        <h1 className="pt-0.5 spacial-shadow ">오늘의 책방</h1>
                        <div className="pb-4 pr-2 font-light text-base hidden md:block">
                          <p className="pb-0">
                            당신의 일상에 새로움을 더하는 문화의 장
                          </p>
                          <p className="pb-2">AI를 통해 책방을 추천받으세요</p>
                        </div>
                        <div className="relative">
                          <AnimatePresence mode="wait">
                            {!aiClick ? (
                              <motion.button
                                className="bookButton w-60 py-3 font-semibold text-xl md:left-0 ml-auto mr-auto left-0 right-0" // Ensure absolute positioning
                                onClick={() => setAiClick(true)}
                                variants={buttonVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                                animate={aiClick ? "clicked" : "initial"}
                              >
                                AI 추천받기
                              </motion.button>
                            ) : null}
                          </AnimatePresence>
                          <AnimatePresence>
                            {aiClick && (
                              <motion.div
                                className="absolute left-0 top-0"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                              >
                                <div className="relative rounded-2xl border-green max-w-full mr-4 font-semibold aiSearch">
                                  <div
                                    onClick={handleSearch}
                                    className="absolute bg-white border p-1 rounded-lg bg-green text-2xl hover:drop-shadow-[2px] active:shadow-inner 	--tw-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06) hover:shadow-sm hover:shadow-green-600 right-0 top-1/2 transform -translate-x-1/3 -translate-y-1/2"
                                  >
                                    <BiSearch />
                                  </div>
                                  <input
                                    placeholder="편안한 분위기에 책 종류가 많은 책방을 추천해줘"
                                    className="w-full p-3 px-4 rounded-2xl text-[16px] font-[300] bg-transparent border-2 border-green-800 focus:border-green-800"
                                    value={inputValue}
                                    onChange={(e) =>
                                      setInputValue(e.target.value)
                                    }
                                  />
                                </div>
                                <motion.div
                                  className="flex flex-wrap gap-2 mt-2"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  {categories.map((category, index) => (
                                    <motion.button
                                      key={category}
                                      onClick={() => toggleCategory(category)}
                                      className={`px-2 py-1 ${
                                        selectedCategories.includes(category)
                                          ? "bg-green-700 text-gray-100 special-shadow-button"
                                          : "bg-gray-100 text-gray-900 special-toggle" 
                                      } rounded-lg text-[14px] z-10`}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.1 * (index + 1) }}
                                    >
                                      {category}
                                    </motion.button>
                                  ))}
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className="relative w-full md:pt-0 mt-40 md:w-1/2 w-full h-auto px-4 justify-center md:my-4 lg:my-12 flex rounded-2xl">
                        <div className="rounded-2xl">
                          {/* Bookstore List */}

                          <AnimatePresence>
  {showBookstoreList && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {isLoading ? (
        <BookstoreListSkeleton />
      ) : (
        <ul className="z-[100] divide-y divide-white py-4 px-4 w-full rounded-2xl max-h-[600px] overflow-y-auto box-extrude">
          {aiList.map((datas) => (
            <React.Fragment key={datas.FCLTY_NM}>
              <li className="p-2 pb-4 my-2 relative special-shadow-button bg-white rounded-2xl">
                <button className="flex" onClick={() => {}}>
                  <div className="flex text-left py-2 absolute right-4 top-[18px] hover:drop-shadow-[2px] active:shadow-inner hover:shadow-sm hover:shadow-green-600 px-4 rounded-2xl ml-auto text-bold text-green-600 hover:text-green-600 right-0 top-1/2">
                    위치 보기
                  </div>
                </button>
                <h3 className="font-semibold text-lg">
                  {datas.FCLTY_NM || "Unknown Facility"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {datas.describe || "No description available"}
                </p>
              </li>
            </React.Fragment>
          ))}
        </ul>
      )}
    </motion.div>
  )}
</AnimatePresence>
                        </div>

                        {!showBookstoreList && (
                          <div className="hidden md:block">
                            <Image
                              src={book}
                              alt="Book recommendation"
                              width={500}
                              height={400}
                              className="relative aspect-auto w-[35vw] rounded-2xl z-[20]"
                            />
                            {/* <Image
                              src={book}
                              alt="Book recommendation"
                              width={500}
                              height={400}
                              className="absolute aspect-auto w-[34vw] rounded-2xl saturate-150 blur-xl z-[10]"
                            /> */}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          {/* <div className="mt-[100vh] w-full flex items-center bg-green-200 h-80 justify-center relative">
            <div className="relative overflow-hidden h-full">
              <h1 className="absolute object-center h-full top-0 left-0 right-0 bottom-0 text-center font-bold text-white bg-black bg-opacity-50 p-2">
                최인아 책방
              </h1>
              <Image
                src={movie}
                alt="introduction"
                width={1920}
                height={500}
                className="rounded-2xl"
              />
            </div>
          </div> */}
        </div>
      </main>
    </>
  );
};

export default Start;
