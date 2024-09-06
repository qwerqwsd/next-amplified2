import React, { useEffect, useRef, useState } from "react";
import { Bookstores } from './bookstorelist'; 

type ViewDetailPageProps = {
    bookstores: Bookstores;
};

const ViewDetailPage: React.FC<ViewDetailPageProps> = ({ bookstores }) => {
    const [toggleReservationPage, setToggleReservationPage] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setToggleReservationPage(false);
        }
    };

    useEffect(() => {
        if (toggleReservationPage) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [toggleReservationPage]);

    return (
        <>
            <div>
                {bookstores.FCLTY_NM}
            </div>
            <button onClick={() => setToggleReservationPage(true)}>예약하기</button>
            {toggleReservationPage && (
                <div className="modal ">
                    <div className="modal-content" ref={modalRef}>
                        <h2>예약 창</h2>
                        <p>{bookstores.FCLTY_NM}에 대한 예약을 진행합니다.</p>
                        <button onClick={() => setToggleReservationPage(false)}>닫기</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewDetailPage;
