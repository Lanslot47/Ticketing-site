"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { Calendar, Timer, Download } from "lucide-react";
import { CiLocationOn } from "react-icons/ci";

type Booking = {
  id: string;
  movie_title: string;
  created_at: string;
  theater: string;
  seat_number: string;
};

const Booking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("tickets")
        .select("id, movie_title, created_at, theater, seat_number")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Booking fetch error:", error);
        setLoading(false);
        return;
      }

      setBookings(data ?? []);
      setLoading(false);
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p className="text-white px-4 py-6">Loading your bookings...</p>;
  }

  if (bookings.length === 0) {
    return <p className="text-white px-4 py-6">No bookings yet.</p>;
  }

  return (
    <div className="font-sans px-4 sm:px-8 py-6">
      <h1 className="text-white font-semibold text-2xl sm:text-4xl mb-6">
        My Bookings
      </h1>

      {bookings.map((booking) => {
        const createdAt = new Date(booking.created_at);

        return (
          <div
            key={booking.id}
            className="border border-gray-700 p-5 sm:p-7 rounded-md mb-6"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
              <h2 className="text-white font-semibold text-lg sm:text-xl">
                {booking.movie_title}
              </h2>

              <span className="bg-yellow-200 text-yellow-600 px-4 py-1 rounded-full text-sm font-semibold w-fit">
                Confirmed
              </span>
            </div>

            <p className="text-gray-500 text-sm mt-1 mb-5">
              Booking ID: BK{booking.id}
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex gap-2 items-center">
                <Calendar className="text-red-600" size={16} />
                <p className="text-gray-400">
                  Date:{" "}
                  <span className="text-white">
                    {createdAt.toLocaleDateString("en-GB")}
                  </span>
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <Timer className="text-red-600" size={16} />
                <p className="text-gray-400">
                  Time:{" "}
                  <span className="text-white">
                    {createdAt.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <CiLocationOn className="text-red-600" size={16} />
                <p className="text-gray-400">
                  Theater:{" "}
                  <span className="text-white">{booking.theater}</span>
                </p>
              </div>

              <p className="text-gray-400">
                Seat:{" "}
                <span className="text-white">{booking.seat_number}</span>
              </p>

              <div className="flex gap-3 pt-2">
                <button className="flex items-center gap-2 px-5 py-2 bg-red-600 rounded-md text-white text-sm font-semibold">
                  <Download size={16} /> Download Ticket
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Booking;
