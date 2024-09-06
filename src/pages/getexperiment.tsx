import React, { useState, useEffect } from 'react';

interface Reservation {
  BookstoreName: string;
  Date: string;
  Time: string;
  Customer: string;
}

const ReservationData: React.FC = () => {
  const [data, setData] = useState<Reservation[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('http://54.180.232.29:8080/reservations?bookstore=example_bookstore&date=2023-09-05');

    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }

    //     const jsonData: Reservation[] = await response.json();
    //     setData(jsonData);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     setError(error instanceof Error ? error.message : 'An unknown error occurred');
    //   }
    // const fetchData = async () => {
    //     try {
    //       const response = await fetch('/api/reservations?bookstore=example_bookstore&date=2023-09-05');
      
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }
      
    //       const jsonData: Reservation[] = await response.json();
    //       setData(jsonData);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //       setError(error instanceof Error ? error.message : 'An unknown error occurred');
    //     }
    //   };
    const fetchData = async () => {
        try {
          const response = await fetch('/api/reservations?bookstore=MyBookstore&date=2023-09-01');
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const jsonData: Reservation[] = await response.json();
          console.log(jsonData); // API 응답 데이터 확인
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
        }
      };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }





  
  return (
    <div>
      {data ? (
        <ul>
          {data.map((reservation, index) => (
            <li key={index}>
              <p>Bookstore: {reservation.BookstoreName}</p>
              <p>Date: {reservation.Date}</p>
              <p>Time: {reservation.Time}</p>
              <p>Customer: {reservation.Customer}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
      
    </div>
  );
};

export default ReservationData;