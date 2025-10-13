import React, { useRef } from "react";
import { getProjectBySlug, getAllProjects } from "../../utils/api";
import Header from "../../components/Header";
import ContentSection from "../../components/ContentSection";
import Footer from "../../components/Footer";
import Head from "next/head";
import { useIsomorphicLayoutEffect } from "../../utils";
import { stagger } from "../../animations";
import data from "../../data/portfolio.json";

const ProjectPost = ({ project }) => {
  const textOne = useRef();
  const textTwo = useRef();

  useIsomorphicLayoutEffect(() => {
    stagger([textOne.current, textTwo.current], { y: 30 }, { y: 0 });
  }, []);

  return (
    <>
      <Head>
        <title>{"Project - " + project.title}</title>
        <meta name="description" content={project.preview} />
      </Head>

      <div className={`container mx-auto mt-10`}>
        <Header isBlog={true} />
        <div className="mt-10 flex flex-col items-center">
          <img
            className="w-auto max-w-2xl h-[600px] rounded-lg shadow-lg object-cover"
            src={project.image}
            alt={project.title}
          ></img>
          <h1
            ref={textOne}
            className="mt-10 text-4xl mob:text-2xl laptop:text-6xl text-bold"
          >
            {project.title}
          </h1>
          <h2
            ref={textTwo}
            className="mt-2 text-xl max-w-4xl text-darkgray opacity-50"
          >
            {project.tagline}
          </h2>
        </div>
        <ContentSection content={project.content}></ContentSection>
        <Footer />
      </div>
    </>
  );
};

export async function getStaticProps({ params }) {
  const project = getProjectBySlug(params.slug, [
    "date",
    "slug",
    "preview",
    "title",
    "tagline",
    "preview",
    "image",
    "content",
  ]);

  return {
    props: {
      project: {
        ...project,
      },
    },
  };
}

export async function getStaticPaths() {
  const projects = getAllProjects(["slug"]);

  return {
    paths: projects.map((project) => {
      return {
        params: {
          slug: project.slug,
        },
      };
    }),
    fallback: false,
  };
}
export default ProjectPost;



