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
      <main className="w-full flex flex-col items-center justify-center pt-14">
      <KakaoMap className="w-20 h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]" latitude={0} longitude={0} name=""/>
      </main>
    </>
  );
};

export default Start;