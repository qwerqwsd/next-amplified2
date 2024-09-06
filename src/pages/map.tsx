"use client";
import type { Metadata } from 'next'
import { KakaoMap } from "../components/kakao";
import { NavComponent } from "../components/nav";

import React, { useState } from "react";
import { Map, CustomOverlayMap } from "react-kakao-maps-sdk";


const Start: React.FC = () => {
  const [level, setLevel] = useState<number>(3);

  return (
    <>
      <NavComponent className="fixed z-50" />
      <KakaoMap className="w-20 h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] pt-60" />
      <main className="w-full flex flex-col items-center justify-center pt-16"></main>
    </>
  );
};

export default Start;