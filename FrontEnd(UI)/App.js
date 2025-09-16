// src/App.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // import external CSS

function App() {
  const [movieName, setMovieName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [timing, setTiming] = useState("");
  const [ticket, setTicket] = useState(null);

  const [ticketId, setTicketId] = useState("");
  const [fetchedTicket, setFetchedTicket] = useState(null);

  // Hardcoded lists
  const movies = ["Inception", "Interstellar", "The Dark Knight", "Tenet", "Dune"];
  const timings = ["10:00 AM", "1:30 PM", "4:30 PM", "7:30 PM", "10:30 PM"];

  // 🎟 Book Ticket
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/bookticket", {
        movieName,
        quantity,
        timing,
      });
      setTicket(res.data);
    } catch (err) {
      console.error(err);
      alert("Error booking ticket");
    }
  };

  // 🔍 Get Ticket by ID
  const handleFetch = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/getticket/${ticketId}`);
      setFetchedTicket(res.data);
    } catch (err) {
      console.error(err);
      alert("Ticket not found");
    }
  };

  return (
    <div className="container">
      <h1 className="title">🎬 Movie Ticket Booking</h1>

      {/* Book Ticket Form */}
      <form className="card" onSubmit={handleSubmit}>
        <h2 className="section-title">Book a Ticket</h2>

        <select value={movieName} onChange={(e) => setMovieName(e.target.value)} required>
          <option value="">-- Select Movie --</option>
          {movies.map((movie, index) => (
            <option key={index} value={movie}>
              {movie}
            </option>
          ))}
        </select>

        <select value={quantity} onChange={(e) => setQuantity(e.target.value)} required>
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>

        <select value={timing} onChange={(e) => setTiming(e.target.value)} required>
          <option value="">-- Select Timing --</option>
          {timings.map((t, index) => (
            <option key={index} value={t}>
              {t}
            </option>
          ))}
        </select>

        <button type="submit" className="btn">Book Ticket</button>
      </form>

      {/* Show booked ticket */}
      {ticket && (
        <div className="card success">
          <h3>✅ Ticket Confirmed</h3>
          <p><b>Ticket ID:</b> {ticket.ticketId}</p>
          <p><b>Movie:</b> {ticket.movieName}</p>
          <p><b>Quantity:</b> {ticket.quantity}</p>
          <p><b>Timing:</b> {ticket.timing}</p>
          <p><b>Price:</b> ₹{ticket.price}</p>
          <p><b>Status:</b> {ticket.status}</p>
        </div>
      )}

      <hr className="divider" />

      {/* Fetch Ticket Details */}
      <div className="card">
        <h2 className="section-title">🔍 Check Ticket Details</h2>
        <input
          type="number"
          placeholder="Enter Ticket ID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
        />
        <button className="btn" onClick={handleFetch}>Get Ticket</button>
      </div>

      {fetchedTicket && (
        <div className="card info">
          <h3>🎟 Ticket Details</h3>
          <p><b>Ticket ID:</b> {fetchedTicket.ticketId}</p>
          <p><b>Movie:</b> {fetchedTicket.movieName}</p>
          <p><b>Quantity:</b> {fetchedTicket.quantity}</p>
          <p><b>Timing:</b> {fetchedTicket.timing}</p>
          <p><b>Price:</b> ₹{fetchedTicket.price}</p>
          <p><b>Status:</b> {fetchedTicket.status}</p>
        </div>
      )}
    </div>
  );
}

export default App;
