"use client";
import { useEffect, useState } from "react";
import { Timer, Calendar, Film } from "lucide-react";
import { CiLocationOn } from "react-icons/ci";
import { supabase } from "@/app/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

const Hero = () => {
  interface Movie {
    id: number;
    title: string;
    release_date: string;
    overview: string;
    poster_path: string | null;
  }
  const [user, setUser] = useState<User | null>(null)
  const [movies, setMovies] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);


  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (data?.user) {
        setUser(data.user)
      }
      if(error){
        console.error(error)
      }
    }

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
    getUser()
    loadPopular();
    loadUpcoming();
  }, []);

  const books = [
    { title: "Total Bookings", num: 24, cont: "+3 this month", icon: <Film className="text-red-600" /> },
    { title: "Upcoming Shows", num: 2, cont: "Next show in 3 days", icon: <Film className="text-red-600" /> },
    { title: "Favorite Genre", num: "Sci-Fi", cont: "12 movies watched", icon: <Film className="text-yellow-600" /> },
    { title: "Watch Time", num: "48hr", cont: "This year", icon: <Film className="text-yellow-600" /> }
  ];

  return (
    <div className="mt-10 pl-6">
      {user ? (
        <h1 className="text-white font-bold text-4xl font-sans mb-3">Welcome back, {user.user_metadata.full_name || user.email}</h1>
      ) : (<p>Loading ...</p>)}
      <p className="text-gray-500 font-sans mb-6">
        Here is what is happening with your movie tickets
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {books.map((item, i) => (
          <div key={i} className="w-60 h-36 rounded-md border-2 border-gray-800 p-6">
            <nav className="flex items-center justify-between mb-2">
              <h1 className="text-white font-semibold text-sm">{item.title}</h1>
              <span>{item.icon}</span>
            </nav>
            <h2 className="text-white font-bold text-2xl">{item.num}</h2>
            <p className="text-gray-500 text-sm">{item.cont}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <div className="p-7 border border-gray-800 w-[493px] rounded-md h-[70vh] overflow-y-auto">
          <h1 className="text-white font-sans mb-3 text-2xl">Upcoming Bookings</h1>
          <p className="font-sm text-gray-500 mb-3">movies releasing soon</p>

          <div className="space-y-6">
            {upcoming.map((movie) => (
              <div key={movie.id} className="border border-gray-800 p-3 pl-8 rounded-md">
                <nav className="flex items-center justify-between">
                  <h1 className="text-white font-semibold">{movie.title}</h1>
                  <button className="border border-gray-800 px-4 py-1 rounded-md text-white font-semibold text-md">
                    view
                  </button>
                </nav>

                <nav className="flex text-gray-500 items-center gap-7">
                  <p className="flex items-center gap-1">
                    <Calendar size={16} /> {movie.release_date}
                  </p>
                  <p className="flex items-center gap-1">
                    <Timer size={16} /> 8:00 PM
                  </p>
                </nav>

                <nav className="flex text-gray-500 items-center gap-7">
                  <p className="flex items-center gap-1">
                    <CiLocationOn size={16} /> Standard Theatre
                  </p>
                  <p>Seats: Auto-assigned</p>
                </nav>
              </div>
            ))}
          </div>
        </div>

        <div className="p-7 border border-gray-800 w-[500px] rounded-md h-[70vh] overflow-y-auto">
          <h1 className="text-white font-sans mb-3 text-2xl">Recommended For You</h1>
          <p className="font-sm text-gray-500 mb-3">based on popular movies</p>

          <div className="grid grid-cols-2 gap-4">
            {movies.map((movie: Movie) => {
              const poster = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/no-image.png"; 

              return (
                <Link  key={movie.id} href={`/user/book/${movie.title}`} className="bg-gray-900 rounded-md overflow-hidden">
                  <img
                    src={poster}
                    alt={movie.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <h2 className="text-white font-semibold text-sm line-clamp-1">
                      {movie.title}
                    </h2>
                    <p className="text-gray-400 text-xs mt-1">{movie.release_date}</p>
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
