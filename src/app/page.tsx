"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "./navbar";
import AboutMe from "./aboutMe";
import TechSkills from "./techSkills";
import Portfolio from "./portfolio";
import ContactMe from "./contactMe";
import Iridescence from "./iridescence";
import VariableProximity from "./VariableProximity";
import localFont from "next/font/local";

const robotoFlex = localFont({
  src: "fonts/RobotoFlex-VariableFont.ttf",
  display: "swap",
  variable: "--font-robotoFlex",
});

const nataSans = localFont({
  src: "fonts/NataSans-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-nataSans",
});

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main
      className={`relative min-h-screen overflow-hidden bg-[#0A192F] text-white ${robotoFlex.className}`}
    >
      {/* Hero Section */}
      <section
        ref={containerRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 z-0 overflow-hidden"
      >
        {/* Hero Background */}
        <div className="absolute inset-0 z-0">
          <Iridescence
            color={[0, 0.5, 0.6]}
            mouseReact={false}
            amplitude={0.1}
            speed={1.0}
          />
          <div className="absolute bottom-0 left-0 right-0 h-90 bg-gradient-to-b from-transparent to-[#0A192F]" />
        </div>

        {/*Content */}
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            className="mb-6 w-full max-w-l mx-auto px-4"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
          >
            <VariableProximity
              label="Hi! I'm Cris Sauquillo an aspiring UI/UX Designer"
              fromFontVariationSettings={`'wght' 600, 'wdth' 300`}
              toFontVariationSettings={`'wght' 900, 'wdth' 150`}
              radius={100}
              containerRef={containerRef as React.RefObject<HTMLElement>}
              className={`${robotoFlex.className} text-white text-4xl lg:text-6xl font-extrabold mb-8`}
            />
          </motion.div>

          <motion.p
            className={`${nataSans.className} text-base text-white/80 lg:text-lg mb-5 lg:mb-15 max-w-2xl mx-auto`}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            My aim is to create a favorable impression on clients, colleagues,
            and online audiences by leveraging my expertise and experience to
            craft engaging and visually appealing websites.
          </motion.p>

          <motion.div
            className="flex justify-center gap-4 flex-wrap"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            <motion.button
              type="button"
              onClick={() => {
                document.getElementById("portfolio")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
                });
              }}
              className={`${nataSans.className} text-black bg-white hover:bg-gray-100 focus:ring-1 font-medium rounded-2xl text-sm px-6 py-3.5`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See My Portfolio
            </motion.button>

            <motion.button
              type="button"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
                });
              }}
              className={`${nataSans.className} text-white backdrop-blur-lg bg-white/10 border border-white/30 hover:bg-white/20 focus:ring-1 font-medium rounded-2xl text-sm px-6 py-3.5`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.button>

          </motion.div>
        </div>
      </section>

      {/* Other Sections with Glowing Background */}
      <div className="relative bg-[#0A192F] overflow-hidden">
        <Navbar />

      {/* Glow Layer - Alternating Vertical & Horizontal Motion */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[
          // Vertical
          { size: 500, top: "20%", left: "25%", dur: 8, x: 0, y: 30 },
          // Horizontal
          { size: 400, top: "70%", left: "65%", dur: 9, x: 35, y: 0 },
          // Vertical
          { size: 300, top: "40%", left: "50%", dur: 10, x: 0, y: -30 },
          // Horizontal
          { size: 350, top: "80%", left: "20%", dur: 11, x: -25, y: 0 },
          // Vertical
          { size: 450, top: "10%", left: "80%", dur: 12, x: 0, y: -25 },
        ].map((circle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#2DA9C0] blur-3xl mix-blend-screen opacity-30"
            style={{
              width: circle.size,
              height: circle.size,
              top: circle.top,
              left: circle.left,
            }}
            animate={{
              x: circle.x !== 0 ? [0, circle.x, 0, -circle.x, 0] : 0,
              y: circle.y !== 0 ? [0, circle.y, 0, -circle.y, 0] : 0,
            }}
            transition={{
              duration: circle.dur,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>




        {/* Sections */}
        <div className="py-4 px-12 sm:px-6 relative z-10">
          <div className="mt-30 backdrop-blur-sm rounded-2xl ">
            <AboutMe />
          </div>
          <div className="mt-20 backdrop-blur-sm rounded-2xl ">
            <TechSkills />
          </div>
          <div className="mt-30 backdrop-blur-sm rounded-2xl  ">
            <Portfolio />
          </div>
          <div className="mt-30 backdrop-blur-sm rounded-2xl ">
            <ContactMe />
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="relative z-10 bg-[#0A192F] border-t border-white/10 py-6">
        <div className="container mx-auto px-6 text-center text-white/70 text-sm">
          <p>© {new Date().getFullYear()} Cris Sauquillo. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

