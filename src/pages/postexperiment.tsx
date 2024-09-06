import React from 'react';

const ReservationComponent = () => {
    
  const sendReservation = async () => {
    
    
    
    const reservationData = {
      bookstore: "MyBookstore",
      date: "2024-09-01",
      time: "17:00",
      customer: "John"
    };

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Reservation successful:', data);
    } catch (error) {
      console.error('Error sending reservation:', error);
    }
  };

  return (
    <div>
      <h1>Reservation Form</h1>
      <button onClick={sendReservation}>Send Reservation</button>
    </div>
  );
};

export default ReservationComponent;