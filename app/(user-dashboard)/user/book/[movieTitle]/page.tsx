"use client";

import { Calendar, Timer } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
// type Booking = {
//   id: string,
//   user_id: string,
//   title: string,
//   seat_number: string,
//   status: string,
//   created_at: string

// }
const Book = () => {
  const params = useParams();
  const movieTitle = params.movieTitle as string;
  const decodedTitle = decodeURIComponent(movieTitle);
  const [date, setDate] = useState("");
  // const [loading, setLoading] = useState(false)
  const [time, setTime] = useState("");
  const [theater, setTheater] = useState("");
  const [seat, setSeat] = useState("");

  async function handleBooking() {
    // setLoading(true)
    const { data: existing } = await supabase.from('tickets').select('*').eq('title', decodedTitle).eq('seat_number', seat)
    if (existing && existing.length > 0) {
      alert('Sorry, this seat is already booked');
      // setLoading(false)
      return
    }
    const { error } = await supabase.from('tickets').insert([{
      title: decodedTitle,
      seat_number: seat,
      status: 'booked',
      theater: theater
    },])
    if (error) {
      alert('Error booking seat')

    }
    else alert('Seat booked successfully')
    // setLoading(false)
  }
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="font-bold text-3xl mb-2">Book Tickets</h1>
      <p className="text-gray-400 mb-6">
        Select your preferred showtime and seats
      </p>

      <div className="grid grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="border border-gray-800 rounded-xl p-6 space-y-4">
          <input
            value={decodedTitle}
            readOnly
            className="p-3 bg-gray-700 text-white w-full rounded-md"
          />

          <div>
            <h2 className="mb-2 flex items-center gap-2">
              <Calendar size={18} /> Select Date
            </h2>
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              className="p-3 bg-gray-700 w-full rounded-md"
            />
          </div>

          <div>
            <h2 className="mb-2">Seat Number</h2>
            <input
              type="number"
              placeholder="Eg: 12"
              onChange={(e) => setSeat(e.target.value)}
              className="p-3 bg-gray-700 w-full rounded-md"
            />
          </div>
        </div>

        {/* MIDDLE */}
        <div className="border border-gray-800 rounded-xl p-6">
          <h2 className="mb-4 flex items-center gap-2">
            <Timer size={18} /> Select Time
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {["10:00 AM", "1:30 PM", "4:00 PM", "7:00 PM", "9:30 PM"].map(
              (t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`border rounded-lg py-3 ${time === t
                      ? "bg-red-700 border-red-700"
                      : "border-gray-700"
                    }`}
                >
                  {t}
                </button>
              )
            )}
          </div>

          <h2 className="mb-4">Theater</h2>
          <div className="grid grid-cols-2 gap-3">
            {["Screen 1", "Screen 2", "Screen 3", "IMAX"].map((t) => (
              <button
                key={t}
                onClick={() => setTheater(t)}
                className={`border rounded-lg py-3 ${theater === t
                    ? "bg-red-700 border-red-700"
                    : "border-gray-700"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="border border-gray-800 rounded-xl p-6 space-y-3">
          <h2 className="text-2xl mb-4">Booking Summary</h2>

          <p className="text-gray-400">
            Movie: <span className="text-white">{decodedTitle}</span>
          </p>
          <p className="text-gray-400">
            Date: <span className="text-white">{date || "-"}</span>
          </p>
          <p className="text-gray-400">
            Time: <span className="text-white">{time || "-"}</span>
          </p>
          <p className="text-gray-400">
            Theater: <span className="text-white">{theater || "-"}</span>
          </p>
          <p className="text-gray-400">
            Seat: <span className="text-white">{seat || "-"}</span>
          </p>

          <button
            className="w-full bg-red-700 py-3 rounded-xl font-semibold mt-4 disabled:opacity-50"
            disabled={!date || !time || !theater || !seat}
            onClick={handleBooking}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
