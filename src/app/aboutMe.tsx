"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import VariableProximity from "./VariableProximity";
import CurvedLoop from "./CurvedLoop";
import localFont from "next/font/local";

const nataSans = localFont({
  src: "fonts/NataSans-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-nataSans",
});

// Reusable flipping image
const FlippableImage = ({
  src,
  alt,
  aspectClass,
  delay = 0,
}: {
  src: string;
  alt: string;
  aspectClass: string; // aspect ratio & max width classes
  delay?: number;
}) => {
  const [rotation, setRotation] = useState(0);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const bounds = imgRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = e.clientX - bounds.left;
    const centerX = bounds.width / 2;
    const rotateY = ((x - centerX) / centerX) * 10; // rotate -10° to +10°
    setRotation(rotateY);
  };

  const handleMouseLeave = () => setRotation(0);

  return (
    <motion.div
      ref={imgRef}
      className={`relative ${aspectClass} w-full group`}
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ delay, duration: 0.9, ease: "easeInOut" }}
    >
      <motion.div
        animate={{ rotateY: rotation }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-full h-full"
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#2DA9C0]/40 to-[#0053C9]/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover rounded-xl shadow-lg relative z-10"
        />
      </motion.div>
    </motion.div>
  );
};

const AboutMe = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="about"
      className="w-full text-white scroll-mt-28 px-4 py-8 lg:px-12"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image collage */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center w-full">
          {/* Portrait */}
          <FlippableImage
            src="/images/gradpic.png"
            alt="Portrait"
            aspectClass="max-w-[500px] aspect-[3/4]"
          />

          {/* Two stacked images */}
          <div className="flex flex-col gap-6 w-full max-w-[500px]">
            <FlippableImage
              src="/images/sirc1.jpg"
              alt="Image 2"
              aspectClass="aspect-[7/5]"
              delay={0.2}
            />
            <FlippableImage
              src="/images/sirc4.jpg"
              alt="Image 3"
              aspectClass="aspect-[7/5]"
              delay={0.4}
            />
          </div>
        </div>

        {/* About Me Text */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeInOut" }}
        >
          <VariableProximity
            label="About Me"
            fromFontVariationSettings={`'wght' 600, 'wdth' 200`}
            toFontVariationSettings={`'wght' 900, 'wdth' 150`}
            radius={100}
            containerRef={containerRef}
            className="text-4xl font-bold"
          />

          <motion.p
            className={`${nataSans.className} mb-6 mt-3 text-justify text-l`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: "easeInOut" }}
            viewport={{ once: false }}
          >
            As a computer science graduate, I believe impactful websites tell
            stories. I am passionate about making user-friendly and easy to
            understand design websites to build meaningful connections and
            achieve online goals with my future clients.
          </motion.p>

          <motion.ul
            className={`${nataSans.className} space-y-2`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: "easeInOut" }}
            viewport={{ once: false }}
          >
            <li>
              <span className="font-bold">Full name:</span> Ma. Cris Fedelyn G.
              Sauquillo
            </li>
            <li>
              <span className="font-bold">Age:</span> 23
            </li>
            <li>
              <span className="font-bold">Course:</span> Bachelor of Science in
              Computer Science
            </li>
            <li>
              <span className="font-bold">Year Graduated:</span> 2025
            </li>
          </motion.ul>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.9, ease: "easeInOut" }}
            viewport={{ once: false }}
          >
            <motion.a
              href="/files/Resume-Sauquillo.pdf"
              download
              className={`${nataSans.className} text-white backdrop-blur-lg bg-white/10 border border-white/30 hover:bg-white/20 
                          focus:ring-4 focus:outline-none focus:ring-pink-200 
                          font-medium rounded-2xl text-sm px-6 py-3.5 text-center 
                          block mx-auto lg:mx-0 w-full sm:w-fit mt-8 transition-all`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download My Resume
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      <div>
        <CurvedLoop />
      </div>
    </section>
  );
};

export default AboutMe;
