import React, { useEffect, useRef, useState } from "react";
import { Bookstores } from './bookstorelist';
import { KakaoMap } from "../components/kakao";
import { AiOutlineClose } from "react-icons/ai";

declare global {
    interface Window {
        kakao: any;
    }
}

type ViewDetailPageProps = {
    bookstores: Bookstores;
};

const ViewDetailPage: React.FC<ViewDetailPageProps> = ({ bookstores }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<'reservation' | 'map'>('reservation');
    const modalRef = useRef<HTMLDivElement>(null);
    const [reservationTime, setReservationTime] = useState<Array<string>>();

    const handleOutsideClick = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isModalOpen]);

    const openModal = (tab: 'reservation' | 'map') => {
        setActiveTab(tab);
        setIsModalOpen(true);
    };

    return (
        <>
            <button onClick={() => openModal('reservation')}>예약하기</button>
            <button onClick={() => openModal('map')}>지도 보기</button>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-screen-lg" ref={modalRef}>
                        <div className="flex mb-4">
                            <div className="flex border border-gray-1 rounded">
                            <button
                                className={`py-2 px-4 rounded  ${activeTab === 'reservation' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                                onClick={() => setActiveTab('reservation')}
                            >
                                예약
                            </button>
                            <button
                                className={`py-2 px-4 rounded ${activeTab === 'map' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                                onClick={() => setActiveTab('map')}
                            >
                                지도
                            </button>
                            </div>
                            <button
                            className="ml-auto px-3 py-2 hover:bg-gray-200 hover:text-black rounded font-mono"
                            onClick={() => setIsModalOpen(false)}
                        >   
                        
                             <AiOutlineClose />
                        </button>
                        </div>
                        {activeTab === 'reservation' ? (
                            <div className=" h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
                                {/* <h2 className="text-xl font-bold mb-2 ">예약 창</h2> */}
                                <p>{bookstores.FCLTY_NM}</p>
                                9:00 10:00 11:00 12:00 1:00 2:00 3:00 4:00 5:00 6:00
                                {/* Add your reservation form here */}
                            </div>
                        ) : (
                            <div className=" rounded overflow-hidden">
                                {/* <h2 className="text-xl font-bold mb-2">지도</h2> */}
                                <KakaoMap 
                                                                    latitude={bookstores.FCLTY_LA} 
                                                                    longitude={bookstores.FCLTY_LO} 
                                                                    name={bookstores.FCLTY_NM} />
                            </div>
                        )}

                    </div>
                </div>
            )}
        </>
    );
};

export default ViewDetailPage;  