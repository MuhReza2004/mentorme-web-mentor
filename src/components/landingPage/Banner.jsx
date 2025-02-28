"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const banners = ["/Banner/slider1.png"];

export default function BannerSlider() {
  const [currentIndex] = useState(0);

  return (
    <div className="relative flex flex-col justify-center items-center py-10">
      {/* Background hijau lebih luas */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-[#379888] -z-10 rounded-b-4xl"></div>

      {/* Banner */}
      <div className="relative w-[90%] md:w-[70%] h-40 md:h-64 overflow-hidden rounded-lg shadow-lg">
        {banners.map((banner, index) => (
          <motion.img
            key={index}
            src={banner}
            alt={`Banner ${index + 1}`}
            className="absolute w-full h-full object-cover rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 1 }}
          />
        ))}
      </div>

      {/* Tambahan teks di bawah banner */}
      <div className="mt-20  bg-white text-[#379888] text-lg text-center w-[40%] md:w-[60%] rounded-sm">
        <p className="font-semibold   ">
          Hal yang bisa kamu dapatkan jika menjadi trainee!
        </p>
      </div>
    </div>
  );
}
