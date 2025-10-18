import React, { useRef } from "react";
import { getProjectBySlug, getAllProjects } from "../../utils/api";
import Header from "../../components/Header";
import ContentSection from "../../components/ContentSection";
import DocumentPreview from "../../components/DocumentPreview";
import LinkPreview from "../../components/LinkPreview";
import CollaborationLogos from "../../components/CollaborationLogos";
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

  const handleFooterScroll = () => {
    const footer = document.querySelector('footer') || 
                  document.querySelector('.mt-5.laptop\\:mt-40') ||
                  document.querySelector('[class*="mt-5"]') ||
                  document.querySelector('div:last-child');
    
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>{"Project - " + project.title}</title>
        <meta name="description" content={project.preview} />
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className={`container mx-auto mt-10 px-4 mob:px-4 desktop:px-8`}>
        <Header 
          isBlog={false} 
          isResume={false} 
          handleContactScroll={handleFooterScroll}
        />
        <div className="mt-10 flex flex-col items-center">
          {project.image && (
            <img
              className={`rounded-lg shadow-lg object-cover ${
                project.slug === 'public-investments' 
                  ? 'w-full max-w-4xl h-auto' 
                  : 'w-full h-96'
              }`}
              style={{ 
                objectPosition: 'center',
                aspectRatio: project.slug === 'public-investments' ? '1046/529' : 'auto'
              }}
              src={project.image}
              alt={project.title}
            ></img>
          )}
          <h1
            ref={textOne}
            className={`text-4xl mob:text-3xl laptop:text-6xl text-bold ${!project.image ? 'mt-0' : 'mt-10'}`}
          >
            {project.title}
          </h1>
          <h2
            ref={textTwo}
            className="mt-2 text-xl mob:text-lg max-w-4xl text-darkgray opacity-50"
          >
            {project.tagline}
          </h2>
        </div>
        <ContentSection content={project.content}></ContentSection>
        {project.document && <DocumentPreview document={project.document} />}
        {project.link && <LinkPreview link={project.link} />}
        <CollaborationLogos collaborators={project.collaborators} />
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
    "collaborators",
    "document",
    "link",
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



