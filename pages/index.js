import { useRef, useEffect, useState } from "react";
import Router from "next/router";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import markdownToHtml from "../utils/markdownToHtml";
import Footer from "../components/Footer";
import Head from "next/head";
// Removed unused imports: Button, Link, Cursor

// Local Data
import data from "../data/portfolio.json";

export default function Home() {
  // Ref
  const workRef = useRef();
  const aboutRef = useRef();
  const contactRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

  // State for markdown content
  const [aboutContent, setAboutContent] = useState("");

  // Process markdown content
  useEffect(() => {
    const processMarkdown = async () => {
      const htmlContent = await markdownToHtml(data.aboutpara);
      setAboutContent(htmlContent);
    };
    processMarkdown();
  }, []);

  // Handle hash navigation
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash === '#work' && workRef.current) {
        workRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === '#about' && aboutRef.current) {
        aboutRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === '#contact' && contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Handle initial hash
    handleHashNavigation();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  // Scroll handling is now done via hash navigation above

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  return (
    <div className={`relative`}>
      {/* {data.showCursor && <Cursor />} */}
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10 px-4 mob:px-4 desktop:px-8">
        <Header />
        <div className="laptop:mt-20 mt-10">
          <div className="mt-5">
            <h1
              ref={textOne}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5"
            >
              {data.headerTaglineOne}
            </h1>
            <h1
              ref={textTwo}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineTwo}
            </h1>
            <h1
              ref={textThree}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineThree}
            </h1>
            <h1
              ref={textFour}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineFour}
            </h1>
          </div>

        </div>
        <div id="work" className="mt-16 mob:mt-28 laptop:mt-30" ref={workRef}>
          <h1 className="text-2xl text-bold">Work.</h1>
          <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
            {data.projects.map((project) => {
              // Define background colors for specific projects
              const getBackgroundColor = (slug) => {
                switch (slug) {
                  case 'hawaii-coffee-plantations':
                    return '#C9ECFF';
                  case 'public-investments':
                    return '#E8EFFF';
                  case 'paternity-leave-reform':
                    return '#F3F3F3';
                  default:
                    return '#ffffff';
                }
              };

              // Define object positioning for specific projects
              const getObjectPosition = (slug) => {
                switch (slug) {
                  case 'indonesia-oil-drilling':
                    return 'center';
                  default:
                    return 'center';
                }
              };

              // Define aspect ratio for specific projects
              const getAspectRatio = (slug) => {
                switch (slug) {
                  case 'public-investments':
                    return '1046/529';
                  default:
                    return 'auto';
                }
              };

              return (
                <WorkCard
                  key={project.id}
                  img={project.imageSrc}
                  name={project.title}
                  description={project.description}
                  onClick={() => Router.push(`/projects/${project.slug}`)}
                  backgroundColor={getBackgroundColor(project.slug)}
                  objectPosition={getObjectPosition(project.slug)}
                  aspectRatio={getAspectRatio(project.slug)}
                />
              );
            })}
          </div>
        </div>

        <div id="about" className="mt-16 mob:mt-28 laptop:mt-40" ref={aboutRef}>
          <h1 className="text-2xl text-bold">About.</h1>
          <div className="mt-5">
            <div 
              className="text-lg laptop:text-2xl w-full laptop:w-3/5 ml-2 laptop:ml-4"
              dangerouslySetInnerHTML={{ __html: aboutContent }}
            />
          </div>
        </div>
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
        <div id="contact" className="mt-16 mob:mt-28 laptop:mt-40" ref={contactRef}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
