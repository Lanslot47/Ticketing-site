"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Home() {
  type Movie = {
    id: number
    title: string
    poster_path: string
    backdrop_path: string
    release_date: string
    overview: string
  }

  const [movies, setMovies] = useState<Movie[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ✅ Fetch movie data from TMDB
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        )
        const data = await res.json()

        if (data && Array.isArray(data.results)) {
          setMovies(data.results)
        } else {
          console.error("Unexpected API response:", data)
          setError("Failed to load movies.")
        }
      } catch (err) {
        console.error("Fetch error:", err)
        setError("Network error. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  // ✅ Auto-slide every 5 seconds
  useEffect(() => {
    if (!movies || movies.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [movies])

  // ✅ Next and previous handlers
  const handleNext = () => {
    if (!movies || movies.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % movies.length)
  }

  const handlePrev = () => {
    if (!movies || movies.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length)
  }

  // ✅ Loading state
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white text-xl flex-col">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="border-4 border-gray-600 border-t-white rounded-full w-10 h-10 mb-4"
        />
        Loading movies...
      </div>
    )

  // ✅ Error state
  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white text-xl">
        {error}
      </div>
    )

  // ✅ No movies found
  if (!movies || movies.length === 0)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white text-xl">
        No movies found.
      </div>
    )

  const movie = movies[currentIndex]

  // ✅ Main movie slider UI
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white flex items-center justify-center">
      {/* Background image with blur */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-lg opacity-40 transition-all duration-700"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      ></div>

      {/* Movie Poster + Info */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/fallback.jpg"
              }
              alt={movie.title}
              className="rounded-2xl shadow-xl w-[280px] sm:w-[320px] md:w-[400px] h-[400px] object-cover"
            />
            <h2 className="text-3xl font-bold mt-5">{movie.title}</h2>
            <p className="text-gray-300 text-sm mt-2">{movie.release_date}</p>
            <p className="text-gray-400 text-sm mt-3 px-3 line-clamp-3">
              {movie.overview}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-3 rounded-full transition"
      >
        <ChevronLeft size={30} className="cursor-pointer" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-3 rounded-full transition"
      >
        <ChevronRight size={30} className="cursor-pointer" />
      </button>

      {/* Dark overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
    </div>
  )
}
