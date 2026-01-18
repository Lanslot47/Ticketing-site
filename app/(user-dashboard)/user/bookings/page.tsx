"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { Calendar, Timer, Download } from "lucide-react";
import { CiLocationOn } from "react-icons/ci";

type Booking = {
  id: number;
  movie_id: number;
  movie_title: string;
  date: string; 
  time: string; 
  theater: string;
  seat: string;
};

const Booking = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
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
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: true });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      const now = new Date();

      const upcoming: Booking[] = [];
      const past: Booking[] = [];

      data.forEach((b: Booking) => {
        const bookingDateTime = new Date(`${b.date}T${b.time}`);
        if (bookingDateTime >= now) upcoming.push(b);
        else past.push(b);
      });

      setUpcomingBookings(upcoming);
      setPastBookings(past);
      setLoading(false);
    };

    fetchBookings();
  }, []);

  if (loading)
    return <p className="text-white px-4 py-6">Loading your bookings...</p>;

  if (upcomingBookings.length === 0 && pastBookings.length === 0)
    return <p className="text-white px-4 py-6">No bookings yet.</p>;

  const renderBooking = (booking: Booking) => (
    <div
      key={booking.id}
      className="border border-gray-700 p-5 sm:p-7 rounded-md mb-6"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <h1 className="text-white font-semibold text-lg sm:text-xl">
          {booking.movie_title}
        </h1>
        <span className="bg-yellow-200 text-yellow-600 px-4 py-1 rounded-full text-sm font-semibold w-fit">
          Confirmed
        </span>
      </div>

      <p className="text-gray-500 text-sm mt-1 mb-5">
        Booking ID: BK{booking.id}
      </p>
      <div className="space-y-4 text-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div className="flex gap-2 items-center">
            <Calendar className="text-red-600" size={16} />
            <p className="text-gray-400">
              Date: <span className="text-white">{booking.date}</span>
            </p>
          </div>
          <p className="text-gray-400">
            Seats: <span className="text-white">{booking.seat}</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div className="flex gap-2 items-center">
            <Timer className="text-red-600" size={16} />
            <p className="text-gray-400">
              Time: <span className="text-white">{booking.time}</span>
            </p>
          </div>
          <p className="text-gray-400">
            Amount: <span className="text-white">$18</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <div className="flex gap-2 items-center">
            <CiLocationOn className="text-red-600" size={16} />
            <p className="text-gray-400">
              Theater: <span className="text-white">{booking.theater}</span>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center justify-center gap-2 px-5 py-2 bg-red-600 rounded-md text-white text-sm font-semibold">
              <Download size={16} /> Download Ticket
            </button>
            <button className="px-5 py-2 border border-gray-500 rounded-md text-white text-sm font-semibold">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans px-4 sm:px-8 py-6">
      <h1 className="text-white font-semibold text-2xl sm:text-4xl mb-2">
        My Bookings
      </h1>
      <p className="text-gray-500 mb-6">
        View and manage your movie tickets
      </p>
      <div className="flex gap-2 mb-8">
        {["upcoming", "past"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-5 py-2 rounded-md font-semibold text-sm ${
              activeTab === tab
                ? "bg-black text-white"
                : "bg-gray-700 text-gray-400"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "upcoming" && upcomingBookings.map(renderBooking)}
      {activeTab === "past" && pastBookings.map(renderBooking)}
    </div>
  );
};

export default Booking;
