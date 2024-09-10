import React from 'react';
import { BiTrash } from "react-icons/bi";
import ViewDetailPage from "./viewDetail";

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
  ADIT_DC: string;
}

interface AppointmentInfoProps {
  bookstores: Bookstores;
  viewDetail: any

}

const BookstoreInfo: React.FC<AppointmentInfoProps> = ({ bookstores, viewDetail }) => {
  return (
    <>
      <li className="px-3 py-3 flex items-start">
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
          <span className="flex-grow text-right">
            평일 문 여는 시간 {bookstores.WORKDAY_OPN_BSNS_TIME} - {bookstores.WORKDAY_CLOS_TIME}<br />
            토요일 문 여는 시간 {bookstores.SAT_OPN_BSNS_TIME} - {bookstores.SAT_CLOS_TIME}<br />
            일요일 문 여는 시간 {bookstores.SUN_OPN_BSNS_TIME} - {bookstores.SUN_CLOS_TIME}
          </span>
        </div>
      </li>
      <ViewDetailPage bookstores={bookstores} />
    </>
  );
};

export default BookstoreInfo;
