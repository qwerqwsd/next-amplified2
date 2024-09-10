"use client";
import "./../app/globals.css";
import Link from "next/link";
import {useState, useEffect} from 'react';
import { NavComponent } from "../components/nav";


interface Place {
    title: string;
    latlng: any; // Using 'any' for kakao.maps.LatLng type
    address: string;
  }


const Result: React.FC = () => {
    const [keyword, setKeyword] = useState<string>("");
    const [places, setPlaces] = useState<Place[]>([]);
    const searchPlaces = () => {}
    return(<>
          <NavComponent className="fixed z-50" />
    <main className="w-full flex flex-col items-center pt-14 relative z-10">
      <div className="absolute z-50 mb-4 pt-4 justify-center w-full">
        <div className="flex justify-center mb-2">
          <input
            type="text"
            placeholder="AI에게 책방을 추천받으세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="search-container"
          />
          <button
            onClick={searchPlaces}
            className="px-2 py-1 bg-blue-500 text-brown-800 rounded search-button z-10"
          >
            검색
          </button>
        </div>
        <div className="w-10/12 bg-white min-h-screen m-auto rounded-2xl z-50">
        <ul className="absolute py-4 px-4 rounded-2xl min-w-60 special-shadow max-h-[60vh] overflow-y-auto">
              {/* {places.map((place, index) => (
                <li key={index} className="mb-4 ">
                  <button
                    onClick={() => {
                      map.setLevel(3);
                      map.panTo(place.latlng);
                    }}
                    className="special-shadow-button rounded-2xl py-1 px-2 text-blue-600"
                  >
                    {place.title}
                  </button>
                  <p className="text-gray-600">{place.address}</p>
                </li>
              ))} */}
            </ul>

        </div>
        </div>

        
        </main>
    </>);

}
    export default Result;