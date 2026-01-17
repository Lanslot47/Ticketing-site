"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Movie = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
            query
          )}&language=en-US&page=1`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query, apiKey]);

  return (
    <div className="min-h-screen bg-black p-10">
      <h1 className="text-white text-3xl font-bold mb-2">Now Playing</h1>
      <p className="text-gray-500 mb-8">
        Book tickets for the latest movies
      </p>
      <div className="flex items-center gap-3 px-5 py-3 border border-gray-800 rounded-md text-gray-300 mb-8">
        <Search />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="w-full bg-transparent border-0 outline-none text-sm font-semibold text-gray-300"
        />
      </div>

      {loading && <p className="text-gray-400 mb-4">Searching...</p>}

      {!loading && query && movies.length === 0 && (
        <p className="text-white text-center mt-10">No movies found!</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => {
          const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/no-image.png";

          return (
            <div
              key={movie.id}
              className="bg-gray-900 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition"
            >
              <Image
                src={poster}
                alt={movie.title}
                width={500}
                height={750}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-white font-semibold mb-3">{movie.title}</h2>
                <button
                  onClick={() => router.push(`/user/book/${movie.title}`)}
                  className="w-full bg-red-700 text-white py-2 rounded-lg"
                >
                  Book Ticket
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movie;
