'use client';
import React, { useState, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
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

const fadeInOut = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function ContactForm() {
  const [formKey, setFormKey] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [state, handleSubmit] = useForm('mqalqgnq');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    setShowPopup(true);
    formRef.current?.reset();
    setTimeout(() => setFormKey((prev) => prev + 1), 100);
  };

  const socials = [
    { name: 'Facebook', icon: <FaFacebook />, url: 'https://facebook.com' },
    { name: 'Instagram', icon: <FaInstagram />, url: 'https://instagram.com' },
    { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com' },
    { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://linkedin.com' },
  ];

  return (
    <motion.section
      ref={containerRef}
      id="contact"
      className={`${nataSans.className} py-16 px-4 sm:px-8 max-w-9xl mx-auto relative`}
      variants={fadeInOut}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Main Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start py-8 lg:px-12"
        variants={fadeInOut}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >

        {/* LEFT COLUMN - Connect + Socials */}
        <div className="flex flex-col h-full">
          <VariableProximity
            label="Connect with me."
            fromFontVariationSettings={`'wght' 600, 'wdth' 300`}
            toFontVariationSettings={`'wght' 900, 'wdth' 150`}
            radius={100}
            containerRef={containerRef as React.RefObject<HTMLElement>}
            className={`${robotoFlex.className} text-white text-3xl font-semibold mb-4`}
          />
          <p className="text-gray-400 mt-3 mb-6">
            You can also reach me through my social media platforms below.
          </p>

          {/* Social Cards Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {socials.map((social, i) => (
              <motion.a
                key={i}
                variants={staggerItem}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex flex-col items-center justify-center rounded-xl shadow p-6 text-white bg-[#0A192F] border border-white overflow-hidden group transition-colors duration-500 h-full"
              >
                <span className="absolute top-0 right-0 w-0 h-0 rounded-full bg-white group-hover:w-[250%] group-hover:h-[250%] transition-all duration-500 ease-out z-0" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="text-3xl mb-2 transition-colors duration-500 group-hover:text-gray-900">
                    {social.icon}
                  </div>
                  <span className="font-medium transition-colors duration-500 group-hover:text-gray-900">
                    {social.name}
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT COLUMN - Get in touch + Form */}
        <div>
          <VariableProximity
            label="Get in Touch!"
            fromFontVariationSettings={`'wght' 600, 'wdth' 300`}
            toFontVariationSettings={`'wght' 900, 'wdth' 150`}
            radius={100}
            containerRef={containerRef as React.RefObject<HTMLElement>}
            className={`${robotoFlex.className} text-white text-3xl font-bold mb-4`}
          />
          <p className="text-gray-400 mt-3 mb-6">
            Have a question or just want to say hello? Fill out the form below and I’ll get back to you as soon as possible.
          </p>

          <form
            key={formKey}
            ref={formRef}
            onSubmit={onSubmit}
            className="grid grid-cols-1 gap-6 rounded-2xl"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
              <input type="text" id="name" name="name" required className="mt-1 w-full rounded-2xl p-2 border border-white bg-transparent text-white shadow-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
              <input id="email" type="email" name="email" required className="mt-1 w-full rounded-2xl p-2 border border-white bg-transparent text-white shadow-sm" />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject</label>
              <input type="text" id="subject" name="subject" required className="mt-1 w-full rounded-2xl p-2 border border-white bg-transparent text-white shadow-sm" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">Your Message</label>
              <textarea id="message" name="message" rows={5} required className="mt-1 w-full rounded-2xl p-2 border border-white bg-transparent text-white shadow-sm" />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>
            <button type="submit" disabled={state.submitting} className="text-white backdrop-blur-lg bg-white/10 border border-white/30 hover:bg-white/20 font-semibold py-3 px-6 rounded-xl transition-all">
              {state.submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Success Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[9999]">
          <div className="bg-[#0A192F] p-6 rounded-xl shadow-xl text-center max-w-sm mx-auto border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-2">Thanks for reaching out!</h2>
            <p className="text-gray-400 mb-4">I&apos;ll get back to you soon.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.section>
  );
}

export default function ContactMe() {
  return <ContactForm />;
}
