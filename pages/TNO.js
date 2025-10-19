import React, { useRef } from "react";
import { getPostBySlug } from "../utils/api";
import Header from "../components/Header";
import ContentSection from "../components/ContentSection";
import Footer from "../components/Footer";
import Head from "next/head";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";

const TNO = ({ post }) => {
  const textOne = useRef();
  const textTwo = useRef();

  useIsomorphicLayoutEffect(() => {
    stagger([textOne.current, textTwo.current], { y: 30 }, { y: 0 });
  }, []);

  const handleContactScroll = () => {
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
        <title>{"TNO - " + post.title}</title>
        <meta name="description" content={post.preview} />
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div
        className={`container mx-auto mt-10 px-4 mob:px-4 desktop:px-8`}
      >
        <Header isBlog={true} isResume={false} handleContactScroll={handleContactScroll} />
        <div className="mt-10 flex flex-col">
          <h1
            ref={textOne}
            className="mt-10 text-4xl mob:text-3xl laptop:text-6xl text-bold"
          >
            {post.title}
          </h1>
          <h2
            ref={textTwo}
            className="mt-2 text-xl mob:text-lg max-w-4xl text-darkgray opacity-50"
          >
            {post.tagline}
          </h2>
        </div>
        <ContentSection content={post.content}></ContentSection>
        <Footer />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const post = getPostBySlug('tno', [
    "date",
    "slug",
    "preview",
    "title",
    "tagline",
    "preview",
    "image",
    "imagePosition",
    "content",
  ]);

  return {
    props: {
      post: {
        ...post,
      },
    },
  };
}

export default TNO;
