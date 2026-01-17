"use client"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

const Hero = () => {
  type Movie = {
    id: number
    poster_path: string
    backdrop_path: string
  }

  const [movies, setMovies] = useState<Movie[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
        )
        const data = await res.json()
        setMovies(data.results)
      } catch {
        setError("Failed to fetch movies.")
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  // Auto slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % movies.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [movies])

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white text-xl">Loading...</div>
    )
  if (error) return <div className="text-white text-center">{error}</div>

  const movie = movies[current]
  if (!movie) return null

  return (
    <div className="relative w-full">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 blur-xl"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center h-screen px-8 text-white">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h1 className="text-7xl font-extrabold leading-tight">Explore.</h1>
          <h1 className="text-7xl font-extrabold leading-tight">Watch.</h1>
          <h1 className="text-7xl font-extrabold leading-tight mb-6">Enjoy.</h1>

          <p className="text-gray-300 text-lg mb-8">
            A new cinematic experience built just for you.
          </p>

          <button className="bg-indigo-600 px-7 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-500 transition">
            <Link href="./auth/Signup">Get Started</Link>
          </button>
        </motion.div>

        {/* Poster — only the image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, scale: 0.92, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.92, x: -40 }}
            transition={{ duration: 0.8 }}
            className="flex items-center"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="Movie Poster"
              className="rounded-2xl shadow-2xl w-[300px] md:w-[410px] h-[500px] object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Hero
