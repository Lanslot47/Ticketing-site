"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { Calendar, Timer } from "lucide-react";
import { CiLocationOn } from "react-icons/ci";
import { Download } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) return;

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: true });

      if (error) {
        console.error(error);
      } else {
        const now = new Date();
        const upcoming = data.filter((b: any) => new Date(b.date) >= now);
        const past = data.filter((b: any) => new Date(b.date) < now);
        setUpcomingBookings(upcoming);
        setPastBookings(past);
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="text-white p-10">Loading your bookings...</p>;
  if (upcomingBookings.length === 0 && pastBookings.length === 0)
    return <p className="text-white p-10">No bookings yet.</p>;

  const renderBooking = (booking: Booking) => (
    <div key={booking.id} className="border border-gray-600 p-7 rounded-md mb-4">
      <div className="flex justify-between">
        <h1 className="text-white font-semibold text-xl">{booking.movie_title}</h1>
        <button className="bg-yellow-200 text-yellow-400 px-4 rounded-xl">Confirmed</button>
      </div>
      <p className="text-gray-500 mb-6">Booking ID: BK{booking.id}</p>
      <div className="space-y-3">
        <nav className="flex justify-between">
          <div className="flex gap-3">
            <Calendar className="text-red-600" size={17} />
            <p className="text-gray-500">Date: <span className="text-white font-semibold">{booking.date}</span></p>
          </div>
          <p className="text-gray-500">Seats: <span className="text-white font-semibold">{booking.seat}</span></p>
        </nav>
        <nav className="flex justify-between">
          <div className="flex gap-3">
            <Timer className="text-red-600" size={17} />
            <p className="text-gray-500">Time: <span className="text-white font-semibold">{booking.time}</span></p>
          </div>
          <p className="text-gray-500">Amount: <span className="text-white font-semibold">$18</span></p>
        </nav>
        <nav className="flex justify-between">
          <div className="flex gap-3">
            <CiLocationOn className="text-red-600" size={17} />
            <p className="text-gray-500">Theater: <span className="text-white font-semibold">{booking.theater}</span></p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex gap-3 px-8 py-2 bg-red-600 rounded-md text-white text-sm font-semibold"><Download /> Download Ticket</button>
            <button className="py-2 px-3 border border-gray-500 rounded-md text-white font-semibold">Cancel</button>
          </div>
        </nav>
      </div>
    </div>
  );

  return (
    <div className="font-sans p-10">
      <h1 className="text-white font-semibold text-4xl mb-3">My Bookings</h1>
      <p className="text-gray-500 mb-6">View and manage your movie tickets</p>

      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-6 py-2 rounded-md font-semibold text-sm cursor-pointer ${activeTab === "upcoming" ? "bg-black text-white" : "bg-gray-700 text-gray-500"}`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`px-6 py-2 rounded-md font-semibold text-sm cursor-pointer ${activeTab === "past" ? "bg-black text-white" : "bg-gray-700 text-gray-500"}`}
        >
          Past
        </button>
      </div>

      {activeTab === "upcoming" && upcomingBookings.map(renderBooking)}
      {activeTab === "past" && pastBookings.map(renderBooking)}
    </div>
  );
};

export default Booking;
