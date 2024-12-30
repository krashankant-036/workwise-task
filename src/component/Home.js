
import React, { useState } from "react";
import "./Home.css";

const Home = () => {
    const totalSeats = 80;
    const seatsPerRow = 7;
    const lastRowSeats = 3;
    const totalRows = Math.ceil(totalSeats / seatsPerRow);
    const lastRowIndex = totalRows - 1;

    const [seats, setSeats] = useState(
        Array.from({ length: totalSeats }, (_, index) => ({
            number: index + 1,
            isBooked: false,
        }))
    );
    const [numSeats, setNumSeats] = useState(0);

    const handleBookSeats = () => {
        const seatsToBook = parseInt(numSeats);
        if (seatsToBook < 1 || seatsToBook > seatsPerRow) {
            alert(`You can book between 1 and ${seatsPerRow} seats.`);
            return;
        }

        const bookedSeats = [];
        let currentRowStart = 0;

        while (bookedSeats.length < seatsToBook) {
            const currentRowEnd =
                currentRowStart === lastRowIndex * seatsPerRow
                    ? currentRowStart + lastRowSeats
                    : currentRowStart + seatsPerRow;

            const currentRowSeats = seats.slice(currentRowStart, currentRowEnd);

            const availableSeats = currentRowSeats.filter(seat => !seat.isBooked);

            for (let seat of availableSeats) {
                if (bookedSeats.length < seatsToBook) {
                    seat.isBooked = true;
                    bookedSeats.push(seat.number);
                } else {
                    break;
                }
            }

            if (bookedSeats.length < seatsToBook) {
                currentRowStart += seatsPerRow;
                if (currentRowStart >= totalSeats) {
                    alert("Not enough seats available.");
                    return;
                }
            }
        }

        setSeats([...seats]);
        alert(`Successfully booked seats: ${bookedSeats.join(", ")}`);
    };

    const handleResetBooking = () => {
        const resetSeats = seats.map(seat => ({
            ...seat,
            isBooked: false,
        }));
        setSeats(resetSeats);
        alert("All bookings have been reset.");
    };

    const bookedCount = seats.filter(seat => seat.isBooked).length;
    const availableCount = seats.filter(seat => !seat.isBooked).length;

    return (
        <div className="allconnect">

            <div className="Ticket-seat">
                <h4 className="hx">Ticket Booking</h4>
                <div className="seats">
                    <ul>
                        {seats.map(seat => (
                            <li
                                key={seat.number}
                                style={{
                                    backgroundColor: seat.isBooked
                                        ? "yellow"
                                        : "rgb(44, 193, 44)",
                                    cursor: seat.isBooked
                                        ? "not-allowed"
                                        : "pointer",
                                }}
                            >
                                {seat.number}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="btns">
                    <button className="btns1">Booked: {bookedCount}</button>
                    <button className="btns2">Available: {availableCount}</button>
                </div>
            </div>

            <div className="book-field">
                <p className="s1">
                    <strong> Book Seats</strong>
                </p>
                <div className="booking">

                    <div className="books1">

                  

                    <input
                        type="number"
                        className="nums"
                        value={numSeats}
                        onChange={(e) => setNumSeats(e.target.value)}
                    />
                    <button className="book" onClick={handleBookSeats}>
                        Book
                    </button>
                    </div>
                    <button className="reset" onClick={handleResetBooking}>
                        Reset Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
