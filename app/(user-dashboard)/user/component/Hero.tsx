"use client";
import { useEffect, useState } from "react";
import { Timer, Calendar, Film } from "lucide-react";
import { CiLocationOn } from "react-icons/ci";
import { supabase } from "@/app/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  interface Movie {
    id: number;
    title: string;
    release_date: string;
    overview: string;
    poster_path: string | null;
  }

  const [user, setUser] = useState<User | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    async function loadPopular() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      );
      const data = await res.json();
      setMovies(data.results.slice(0, 6));
    }

    async function loadUpcoming() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
      );
      const data = await res.json();
      setUpcoming(data.results.slice(0, 3));
    }

    getUser();
    loadPopular();
    loadUpcoming();
  }, []);

  const books = [
    { title: "Total Bookings", num: 24, cont: "+3 this month", icon: <Film className="text-red-600" /> },
    { title: "Upcoming Shows", num: 2, cont: "Next show in 3 days", icon: <Film className="text-red-600" /> },
    { title: "Favorite Genre", num: "Sci-Fi", cont: "12 movies watched", icon: <Film className="text-yellow-600" /> },
    { title: "Watch Time", num: "48hr", cont: "This year", icon: <Film className="text-yellow-600" /> },
  ];

  return (
    <div className="mt-10 px-4 sm:px-6">
      {user ? (
        <h1 className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl mb-3">
          Welcome back, {user.user_metadata.full_name || user.email}
        </h1>
      ) : (
        <p className="text-gray-400">Loading ...</p>
      )}

      <p className="text-gray-500 mb-6">
        Here is what is happening with your movie tickets
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {books.map((item, i) => (
          <div
            key={i}
            className="w-full rounded-md border border-gray-800 p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-white font-semibold text-sm">
                {item.title}
              </h1>
              {item.icon}
            </div>
            <h2 className="text-white font-bold text-2xl">{item.num}</h2>
            <p className="text-gray-500 text-sm">{item.cont}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="p-6 border border-gray-800 w-full lg:w-[480px] rounded-md max-h-[70vh] overflow-y-auto">
          <h1 className="text-white mb-2 text-xl">Upcoming Bookings</h1>
          <p className="text-gray-500 mb-4">movies releasing soon</p>

          <div className="space-y-5">
            {upcoming.map((movie) => (
              <div
                key={movie.id}
                className="border border-gray-800 p-4 rounded-md"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h1 className="text-white font-semibold text-sm">
                    {movie.title}
                  </h1>
                  <button className="border border-gray-700 px-3 py-1 rounded-md text-white text-sm">
                    view
                  </button>
                </div>

                <div className="flex flex-wrap text-gray-500 gap-4 mt-2 text-sm">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {movie.release_date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Timer size={14} /> 8:00 PM
                  </span>
                </div>

                <div className="flex flex-wrap text-gray-500 gap-4 mt-1 text-sm">
                  <span className="flex items-center gap-1">
                    <CiLocationOn size={14} /> Standard Theatre
                  </span>
                  <span>Seats: Auto-assigned</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border border-gray-800 w-full lg:w-[500px] rounded-md max-h-[70vh] overflow-y-auto">
          <h1 className="text-white mb-2 text-xl">Recommended For You</h1>
          <p className="text-gray-500 mb-4">based on popular movies</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {movies.map((movie) => {
              const poster = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/no-image.png";

              return (
                <Link
                  key={movie.id}
                  href={`/user/book/${movie.title}`}
                  className="bg-gray-900 rounded-md overflow-hidden"
                >
                  <Image
                    src={poster}
                    alt={movie.title}
                    width={500}
                    height={300}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-3">
                    <h2 className="text-white font-semibold text-sm line-clamp-1">
                      {movie.title}
                    </h2>
                    <p className="text-gray-400 text-xs">
                      {movie.release_date}
                    </p>
                    <p className="text-gray-300 text-xs mt-2 line-clamp-3">
                      {movie.overview}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
