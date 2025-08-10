"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  const scrollToContact = () => {
    setLiked(true);
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[70%] z-50 bg-white/30 backdrop-blur-md border border-white/20 shadow-md rounded-3xl px-4">
      <div className="container mx-auto flex items-center justify-between px-5 py-3 lg:py-3">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo-white.png"
            alt="Logo"
            width={50}
            height={40}
            className="cursor-pointer transition-opacity duration-500 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 font-medium text-lg text-white">
          <li>
            <button
              onClick={() =>
                document.getElementById("about")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
                })
              }
              className="hover:text-gray-300 transition cursor-pointer"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                document.getElementById("skills")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
                })
              }
              className="hover:text-gray-300 transition cursor-pointer"
            >
              Skills
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                document.getElementById("portfolio")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
                })
              }
              className="hover:text-gray-300 transition cursor-pointer"
            >
              Portfolio
            </button>
          </li>
        </ul>

        {/* Phone Scroll Button (desktop only) */}
        <div className="hidden md:block">
          <button
            onClick={scrollToContact}
            className="p-2 rounded-full transition duration-300 text-white hover:text-gray-300"
            aria-label="Scroll to Contact"
          >
            <Phone
              size={24}
              fill={liked ? "white" : "transparent"}
              stroke="white"
            />
          </button>
        </div>

        {/* Hamburger Icon (mobile only) */}
        <div className="md:hidden text-white">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-5 pb-4">
          <ul className="flex flex-col space-y-4 text-white font-medium text-lg">
            <li className="text-center hover:text-gray-300 transition">
              <button
                onClick={() => {
                  document.getElementById("about")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                  });
                  setIsOpen(false);
                }}
              >
                About
              </button>
            </li>
            <li className="text-center hover:text-gray-300 transition">
              <button
                onClick={() => {
                  document.getElementById("skills")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                  });
                  setIsOpen(false);
                }}
              >
                Skills
              </button>
            </li>
            <li className="text-center hover:text-gray-300 transition">
              <button
                onClick={() => {
                  document.getElementById("portfolio")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                  });
                  setIsOpen(false);
                }}
              >
                Portfolio
              </button>
            </li>
            <li className="text-center">
              <button
                onClick={() => {
                  scrollToContact();
                  setIsOpen(false);
                }}
                className="p-2 rounded-full transition text-white hover:text-gray-300"
                aria-label="Scroll to Contact"
              >
                <Phone
                  size={24}
                  fill={liked ? "white" : "transparent"}
                  stroke="white"
                />
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
