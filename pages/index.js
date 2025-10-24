import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Router from "next/router";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import markdownToHtml from "../utils/markdownToHtml";
import Footer from "../components/Footer";
import Head from "next/head";
import data from "../data/portfolio.json";
import Image from "next/image";

export default function Home() {
  // Refs
  const workRef = useRef();
  const aboutRef = useRef();
  const contactRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

  // Markdown content
  const [aboutContent, setAboutContent] = useState("");

  useEffect(() => {
    const processMarkdown = async () => {
      const htmlContent = await markdownToHtml(data.aboutpara);
      setAboutContent(htmlContent);
    };
    processMarkdown();
  }, []);

  // Smooth hash navigation
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash === "#work" && workRef.current) {
        workRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#about" && aboutRef.current) {
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#contact" && contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    handleHashNavigation();
    window.addEventListener("hashchange", handleHashNavigation);
    return () => window.removeEventListener("hashchange", handleHashNavigation);
  }, []);

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  // 🔽 NEW: filter state and category list
  const [filter, setFilter] = useState("All");

  // Dynamically collect unique categories from your project data
  // Collect all unique categories and sort them by SDG number
  const allCategories = Array.from(
    new Set(
      data.projects.flatMap((p) =>
        Array.isArray(p.category) ? p.category : [p.category]
      )
    )
  ).sort((a, b) => {
    const numA = parseInt(a);
    const numB = parseInt(b);
    return numA - numB;
  });

  const categories = ["All", ...allCategories];



  return (
    <div className="relative">
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10 px-4 mob:px-4 desktop:px-8">
        <Header />
        <div className="laptop:mt-20 mt-10">
          <div className="mt-5">
            {[textOne, textTwo, textThree, textFour].map((ref, i) => (
              <h1
                key={i}
                ref={ref}
                className="text-5xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
              >
                {data[`headerTagline${["One", "Two", "Three", "Four"][i]}`]}
              </h1>
            ))}
          </div>
        </div>

        {/* Work Section */}
        <div id="work" className="mt-16 mob:mt-28 laptop:mt-30 relative z-0" ref={workRef}>
          <h1 className="text-2xl text-bold">Work.</h1>

          {/* 🔽 Filter buttons */}
          <div className="relative">
            <div className="flex tablet:flex-wrap gap-3 mt-4 overflow-x-auto tablet:overflow-visible pb-2 pt-2 scrollbar-hide snap-x snap-mandatory">
              {categories.map((cat) => {
                if (cat === "All") {
                  return (
                    <button
                      key="All"
                      onClick={() => setFilter("All")}
                      className={`flex-shrink-0 rounded-lg border p-2 transition-all duration-300 ${filter === "All"
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:scale-105"
                        }`}
                    >
                      All
                    </button>
                  );
                }

                const goalNumber = cat.split(" ")[0];
                const imagePath = `/images/sdgs/sdg-${goalNumber}.png`;

                return (
                  <motion.button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className={`relative flex-shrink-0 snap-center z-0 hover:z-30
                      w-16 h-16 tablet:w-20 tablet:h-20 laptop:w-24 laptop:h-24
                      rounded-xl overflow-visible transition-all duration-300
                      transition-opacity ease-in-out
                        ${filter !== "All" && filter !== cat 
                        ? "opacity-50 hover:opacity-100"
                        : "opacity-100"
                      }
      `}
                  >
                    <motion.div
                      className="relative w-full h-full rounded-xl overflow-hidden"
                    >
                      <Image
                        src={imagePath}
                        alt={cat}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="absolute inset-0"
                      />
                      <div
                        className={`absolute inset-0 rounded-xl border-2 transition-colors duration-300 ${filter === cat
                            ? "border-black dark:border-white"
                            : "border-transparent"
                          }`}
                      />
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>
            {/* Right fade */}
            <div className="pointer-events-none absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-white dark:from-slate-900 to-transparent" />
          </div>  

          {/* 🔽 Animated card grid */}
          <motion.div
            layout
            className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4"
          >
            <AnimatePresence>
              {data.projects
                .filter((p) => {
                  if (filter === "All") return true;
                  if (Array.isArray(p.category)) {
                    return p.category.includes(filter);
                  }
                  return p.category === filter;
                })
                .map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >

                    <WorkCard
                      img={project.imageSrc}
                      name={project.title}
                      description={project.description}
                      onClick={() => Router.push(`/projects/${project.slug}`)}
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* About */}
        <div id="about" className="mt-16 mob:mt-28 laptop:mt-40" ref={aboutRef}>
          <h1 className="text-2xl text-bold">About.</h1>
          <div className="mt-5">
            <div
              className="text-lg laptop:text-2xl w-full laptop:w-3/5 ml-2 laptop:ml-4"
              dangerouslySetInnerHTML={{ __html: aboutContent }}
            />
          </div>
        </div>

        {/* Vision */}
        <div className="mt-16 mob:mt-28 laptop:mt-40">
          <h1 className="text-2xl text-bold">The Hi-Res Vision.</h1>
          <div className="mt-5 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>

        {/* Contact */}
        <div
          id="contact"
          className="mt-16 mob:mt-28 laptop:mt-40"
          ref={contactRef}
        >
          <Footer />
        </div>
      </div>
    </div>
  );
}