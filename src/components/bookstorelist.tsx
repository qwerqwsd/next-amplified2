import React from 'react';
import { BiTrash } from "react-icons/bi";
import ViewDetailPage from "./viewDetail"

export interface Bookstores {
ESNTL_ID: string;
FCLTY_NM: string;
LCLAS_NM: string;
MLSFC_NM: string;
ZIP_NO: number;
FCLTY_ROAD_NM_ADDR: string;
FCLTY_LA: number;
FCLTY_LO: number;
WORKDAY_OPN_BSNS_TIME: string;
WORKDAY_CLOS_TIME: string;
SAT_OPN_BSNS_TIME: string;
SAT_CLOS_TIME: string;
SUN_OPN_BSNS_TIME: string;
SUN_CLOS_TIME: string;
RSTDE_OPN_BSNS_TIME: string;
RSTDE_CLOS_TIME: string;
RSTDE_GUID_CN: string;
TEL_NO: number;
OPTN_DC: string;
ADIT_DC: string;}


// "ESNTL_ID": "KCCBSPO22N000000439",
// "FCLTY_NM": "AR영어북카페",
// "LCLAS_NM": "북카페",
// "MLSFC_NM": "영어북카페",
// "ZIP_NO": 6280,
// "FCLTY_ROAD_NM_ADDR": "서울 강남구 남부순환로 2927 대치클래시아 124~125호",
// "FCLTY_LA": 37.49366458,
// "FCLTY_LO": 127.0603395,
// "WORKDAY_OPN_BSNS_TIME": "12:00",
// "WORKDAY_CLOS_TIME": "19:00",
// "SAT_OPN_BSNS_TIME": "11:00",
// "SAT_CLOS_TIME": "17:00",
// "SUN_OPN_BSNS_TIME": "11:00",
// "SUN_CLOS_TIME": "17:00",
// "RSTDE_OPN_BSNS_TIME": "",
// "RSTDE_CLOS_TIME": "",
// "RSTDE_GUID_CN": "공휴일 휴무",
// "TEL_NO": 220512727,
// "OPTN_DC": "다양한 영어책, 르네상스러닝 독서프로그램, 성공적인 영어독서 습관 획득 가능",
// "ADIT_DC": "주차 : 가능, 화장실 남녀구분 : 구분, 카페 : 있음"







interface AppointmentInfoProps {
    bookstores: Bookstores;
  viewDetail: (id: number) => void;
}

const BookstoreInfo: React.FC<AppointmentInfoProps> = ({ bookstores }, viewDetail ) => {
  return (<>
    <li className="px-3 py-3 flex items-start">
      {/* <button onClick={() => viewDetail(bookstores.ESNTL_ID)} type="button"
        className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        상세 보기
      </button> */}
      <div className="flex-grow">
      <div><b className="font-bold text-green-500">대분류</b> {bookstores.LCLAS_NM}</div>
        <div className="leading-tight">중분류 {bookstores.MLSFC_NM}</div>
        <div className="flex items-center">
          <span className="flex-none font-bold text-3xl text-gray-700">{bookstores.FCLTY_NM}</span>
        </div>
        <span className="flex-grow text-right">{bookstores.OPTN_DC}</span>
        <span className="flex-grow text-right">{bookstores.ADIT_DC}</span>
        <span className="flex-grow text-right">{bookstores.FCLTY_ROAD_NM_ADDR}</span>
        <span className="flex-grow text-right">{bookstores.RSTDE_GUID_CN}</span>
        <span className="flex-grow text-right">평일 문 여는 시간{bookstores.WORKDAY_OPN_BSNS_TIME}-{bookstores.WORKDAY_CLOS_TIME} 
        토요일 문 여는 시간{bookstores.SAT_OPN_BSNS_TIME}-{bookstores.SAT_CLOS_TIME}
        일요일 문 여는 시간{bookstores.SUN_OPN_BSNS_TIME}-{bookstores.SUN_CLOS_TIME}
        </span>
        
      </div>
    </li>
    <ViewDetailPage bookstores={bookstores} />
    </>
  );
};

export default BookstoreInfo;