"use client";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="mt-32 bg-white transition">
      {/* First heading animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold">Hello</h1>
      </motion.div>

      {/* Paragraph animation (starts a bit later) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
      >
        <p className="text-lg mt-4">skskskskskkkskskks</p>
      </motion.div>
    </div>
  );
};

export default Hero;
