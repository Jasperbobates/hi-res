import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { stagger } from "../../animations";
import Header from "../../components/Header";
import data from "../../data/portfolio.json";
import { useIsomorphicLayoutEffect } from "../../utils";
import { getAllProjects } from "../../utils/api";

const Projects = ({ projects }) => {
  const text = useRef();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    stagger(
      [text.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
    stagger([text.current], { y: 30 }, { y: 0 });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <div className={`container mx-auto mb-10`}>
        <Header isBlog={true}></Header>
        <div className="mt-10">
          <h1
            ref={text}
            className="mx-auto mob:p-2 text-bold text-6xl laptop:text-8xl w-full"
          >
            Projects.
          </h1>
          <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
            {projects &&
              projects.map((project) => (
                <div
                  className="cursor-pointer relative"
                  key={project.slug}
                  onClick={() => Router.push(`/projects/${project.slug}`)}
                >
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      className="w-full h-96 rounded-lg shadow-lg object-cover hover:scale-110 transition-all ease-out duration-300"
                      src={project.image}
                      alt={project.title}
                    ></img>
                  </div>
                  <h2 className="mt-5 text-4xl">{project.title}</h2>
                  <p className="mt-2 opacity-50 text-lg">{project.preview}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const projects = getAllProjects([
    "slug",
    "title",
    "image",
    "preview",
    "tagline",
    "date",
  ]);

  return {
    props: {
      projects: [...projects],
    },
  };
}

export default Projects;



