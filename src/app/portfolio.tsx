"use client";
import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import VariableProximity from "./VariableProximity";
import localFont from "next/font/local";
import Image from "next/image";

const nataSans = localFont({
  src: "fonts/NataSans-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-nataSans",
});

const fadeInVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Portfolio = () => {
  const categories = ["All", "Websites", "Mobile"];

  const projects = [
    {
      img: "/images/safetapp.png",
      vid: "/images/sapfetapp-vid.mp4",
      title: "SafeTapp. - Mobile",
      description: "A secure and user-friendly e-wallet application that allows users to send, receive, and manage money conveniently while ensuring top-level protection for every transaction.",
      category: "Mobile",
      figma:
        "https://www.figma.com/design/DrZ0VMlmDrh7bneFFHp5pP/Safetapp?node-id=0-1&p=f&t=HLbn4gv9O91cXIeX-0",
    },
    {
      img: "/images/modera.png",
      vid: "/images/modera-vid.mp4",
      title: "Modera - Mobile",
      description: "A modern fashion shopping app UI.",
      category: "Mobile",
      figma:
        "https://www.figma.com/file/wt39fKubZXIw0gVqkNaTyI/SAUQUILLO_MODERA-UI-UX-DESIGN",
    },
    {
      img: "/images/sporthub.png",
      vid: "/images/sporthub-vid.mp4",
      title: "SportHub - Mobile",
      description:
        "SportHub is an online retailer offering a wide range of quality sports gear, apparel, and equipment for athletes and fitness enthusiasts",
      category: "Mobile",
      figma: "https://www.figma.com/file/viGwz0ZhJtTd6bhO4B6VI7/SportHub-Website",
    },
    {
      img: "/images/crowdeye.png",
      vid: "/images/crowdeye-vid.mp4",
      title: "CrowdEye - Mobile",
      description:
        "Crowd Eye is a smartphone app that helps travelers discover a less congested spot to spend their time on vacation.",
      category: "Mobile",
      figma:
        "https://www.figma.com/file/iOCzb1ZIe0ETNw47H5f6Ee/PhotoCam---CrowdEye",
    },
    {
      img: "/images/photocam.png",
      vid: "/images/photocam-vid.mp4",
      title: "PhotoCam - Mobile",
      description: "A mobile application where you can post and browse photos.",
      category: "Mobile",
      figma:
        "https://www.figma.com/file/iOCzb1ZIe0ETNw47H5f6Ee/PhotoCam---CrowdEye",
    },
    {
      img: "/images/clanexperiences.png",
      vid: "/images/clanexperiences-vid.mp4",
      title: "Clan Experiences - Mobile",
      description:
        "Clan Experiences is a travel company that connects joiners and adventurers through curated group tours, creating unforgettable shared journeys and cultural discoveries.",
      category: "Mobile",
      figma: "https://www.figma.com/file/9La6O0s8DkblmuGpfo3drT/Clan-Experiences",
    },
    {
      img: "/images/clanexperience-desktop.png",
      vid: "/images/clanexperience-desktop-vid.mp4",
      title: "Clan Experiences - Website",
      description:
        "Clan Experiences is a travel company that connects joiners and adventurers through curated group tours, creating unforgettable shared journeys and cultural discoveries.",
      category: "Websites",
      figma: "https://www.figma.com/file/9La6O0s8DkblmuGpfo3drT/Clan-Experiences",
    },
    {
      img: "/images/sporthub-desktop.png",
      vid: "/images/sporthub-desktop-vid.mp4",
      title: "SportHub - Website",
      description:
        "SportHub is an online retailer offering a wide range of quality sports gear, apparel, and equipment for athletes and fitness enthusiasts",
      category: "Websites",
      figma: "https://www.figma.com/file/viGwz0ZhJtTd6bhO4B6VI7/SportHub-Website",
    },
    {
      img: "/images/misd-desktop.png",
      vid: "/images/misd-desktop-vid.mp4",
      title: "MISDesk - Website",
      description:
        "An Issue Resolution Ticketing System tracks, manages, and resolves user-reported problems efficiently.",
      category: "Websites",
      figma: "https://www.figma.com/file/cFTK3Wc9cVnWn3qligS6Ln/MISDesk",
    },
    {
      img: "/images/tyrone-desktop.png",
      vid: "/images/tyrone-desktop-vid.mp4",
      title: "Tyrone - Website",
      description: "Job hunting app for the e-sport industry.",
      category: "Websites",
      figma: "https://www.figma.com/file/u7mICpnRRkBgxGizOoHDAC/Project-TYRone",
    },
  ];

  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [animationKey, setAnimationKey] = useState(0);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const currentIndex = filteredProjects.findIndex(
    (p) => p.title === selectedProject.title
  );

  const handlePrev = () => {
    const prevIndex =
      (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[prevIndex]);
    setAnimationKey((prev) => prev + 1);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIndex]);
    setAnimationKey((prev) => prev + 1);
  };

  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [catRef, catInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [thumbRef, thumbInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [highlightRef, highlightInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="portfolio"
      className={`${nataSans.className} text-white py-10 scroll-mt-28`}
    >
      <div className="mx-auto px-4 max-w-7xl" ref={containerRef}>
        {/* Title */}
        <motion.h2
          className="mb-6 text-center"
          variants={fadeInVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <VariableProximity
            label="Portfolio"
            fromFontVariationSettings={`'wght' 600, 'wdth' 300`}
            toFontVariationSettings={`'wght' 900, 'wdth' 150`}
            radius={100}
            containerRef={containerRef as React.RefObject<HTMLElement>}
            className="text-4xl font-bold text-white"
          />
        </motion.h2>

        {/* Top Controls */}
        <motion.div
          className="flex items-center justify-between mb-4 px-2"
          ref={ref}
          variants={fadeInVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <p className="text-sm font-medium">Projects by Cris Sauquillo</p>
          <div className="flex gap-4 text-sm">
            <span
              onClick={handlePrev}
              className="cursor-pointer underline underline-offset-4 hover:text-gray-400"
            >
              Prev
            </span>
            <span
              onClick={handleNext}
              className="cursor-pointer underline underline-offset-4 hover:text-gray-400"
            >
              Next
            </span>
          </div>
        </motion.div>

        {/* Highlighted Project */}
        <motion.div
          ref={highlightRef}
          variants={fadeInVariants}
          initial="hidden"
          animate={highlightInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="mb-12 w-full"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={animationKey}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-lg h-auto md:h-[360px]"
            >
              {/* Video */}
              <div className="w-full md:w-1/2 aspect-video md:aspect-auto">
                <video
                  src={selectedProject.vid}
                  className="w-full h-full object-cover pointer-events-none"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center gap-4">
                <h3 className="text-xl md:text-2xl font-bold">
                  {selectedProject.title}
                </h3>
                <p className="text-zinc-400 text-sm">{selectedProject.description}</p>
                <div>
                  <a
                    href={selectedProject.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white backdrop-blur-lg bg-white/10 border border-white/30 hover:bg-white/20 font-medium rounded-2xl text-sm px-4 py-2 transition-all"
                  >
                    Visit Figma
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Categories */}
        <motion.div
          ref={catRef}
          className="flex gap-4 mb-8 justify-center flex-wrap"
          variants={fadeInVariants}
          initial="hidden"
          animate={catInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                const list =
                  cat === "All"
                    ? projects
                    : projects.filter((p) => p.category === cat);
                setSelectedProject(list[0] ?? projects[0]);
                setAnimationKey((prev) => prev + 1);
              }}
              className={`px-4 py-1 rounded-full border border-white text-sm transition ${
                activeCategory === cat
                  ? "bg-white text-black"
                  : "text-white hover:bg-white hover:text-[#0A192F]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Thumbnails */}
        <motion.div
          ref={thumbRef}
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          variants={fadeInVariants}
          initial="hidden"
          animate={thumbInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          {filteredProjects.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedProject(item);
                setAnimationKey((prev) => prev + 1);
              }}
              className={`relative group rounded-xl overflow-hidden transition-all border-2 ${
                selectedProject.title === item.title
                  ? "ring-1"
                  : "border-transparent"
              }`}
            >
              <div className="relative w-full h-[200px]">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <video
                  src={item.vid}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-[#0A192F]/80 text-white text-sm font-medium text-center py-1">
                {item.title}
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
