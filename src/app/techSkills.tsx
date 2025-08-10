"use client";
import React, { useRef } from "react";
import GlassIcon from "./GlassIcon";
import { motion } from "framer-motion";
import VariableProximity from "./VariableProximity";

const fadeFrom = {
  left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  top: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
  bottom: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
};

const TechSkills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const skills = [
    { src: "/images/html5.svg", alt: "HTML 5", label: "HTML 5", color: "gray" },
    { src: "/images/css3.svg", alt: "CSS 3", label: "CSS 3", color: "gray" },
    { src: "/images/javascript.svg", alt: "JavaScript", label: "JavaScript", color: "gray" },
    { src: "/images/typescript.png", alt: "Typescript", label: "Typescript", color: "gray" },
    { src: "/images/tailwind.png", alt: "Tailwind", label: "Tailwind", color: "gray" },
    { src: "/images/figma.svg", alt: "Figma", label: "Figma", color: "gray" },
    { src: "/images/adobePhotoShop.svg", alt: "Adobe PhotoShop", label: "Adobe PhotoShop", color: "gray" },
    { src: "/images/adobeXd.svg", alt: "Adobe XD", label: "Adobe XD", color: "gray" },
    { src: "/images/canva.png", alt: "Canva", label: "Canva", color: "gray" },
    { src: "/images/capcut.png", alt: "Capcut", label: "Capcut", color: "gray" },
  ];

  return (
    <section 
      id="skills"
      className="text-white px-4 sm:px-8 sm:pt-12 lg:pt-25">
      <div className="container mx-auto">
        {/* Animated Section Title */}
        <motion.div
          ref={containerRef}
          variants={fadeFrom.left}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <VariableProximity
            label="Technical Skills"
            fromFontVariationSettings={`'wght' 600, 'wdth' 200`}
            toFontVariationSettings={`'wght' 900, 'wdth' 150`}
            radius={100}
            containerRef={containerRef}
            className="text-4xl font-bold mb-20"
          />
        </motion.div>

        {/* Animated Grid of Skills */}
        <div className="grid gap-[5em] grid-cols-2 md:grid-cols-4 mt-20">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center"
              variants={fadeFrom.bottom}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.05, ease: [0.83, 0, 0.17, 1] }}
            >
              <GlassIcon
                src={skill.src}
                alt={skill.alt}
                label={skill.label}
                color={skill.color}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSkills;

