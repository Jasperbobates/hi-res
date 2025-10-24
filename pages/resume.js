import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// Removed unused Cursor import
import Header from "../components/Header";
import ProjectResume from "../components/ProjectResume";
import Socials from "../components/Socials";
import { useTheme } from "next-themes";
import Image from "next/image";
// Data
import data from "../data/portfolio.json";
const { showResume, resume, skills } = data;

const Resume = () => {
  const router = useRouter();
  const { theme, resolvedTheme } = useTheme();
  const [mount, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {setMounted(true);}, []);

  return (
    <>
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>
      <div  className="container mx-auto mb-10 px-2 tablet:px-4 laptop:px-8">
        <Header/>
        {mount && (
          <div className="mt-10 w-full flex flex-col items-center">
            <div
              className={`w-full ${resolvedTheme === "dark" ? "bg-slate-800" : "bg-gray-50"
                } max-w-4xl p-4 tablet:p-8 laptop:p-16 rounded-lg shadow-sm transition-colors duration-200`}
            >
            {/* container for text + image */}
            <div className="flex flex-col desktop:flex-row desktop:items-center gap-12">
              {/* LEFT (text & socials) */}
              <div className="desktop:w-2/3 w-full flex flex-col items-start">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Jasper Bonesmo Bates
                </h1>
                <h2 className="text-xl mt-5 text-gray-800 dark:text-gray-200">
                  {resume.tagline}
                </h2>
                  <h2 className="w-full laptop:w-4/5 text-xl mt-5 opacity-50 text-gray-700 dark:text-gray-300 text-justify leading-relaxed">
                    {resume.description}
                  </h2>
                {/* socials + image on mobile */}
                <div className="mt-4 flex flex-col items-center w-full">
                  <Socials />
                  {/* 👇 only visible on mobile */}
                  <div className="w-full flex justify-center desktop:hidden mt-6">
                    <div className="relative w-full max-w-[250px] aspect-square">
                      <Image
                        src="/images/resume_pics/profile.jpg"
                        alt="Jasper Bonesmo Bates"
                        width={250}
                        height={250}
                        priority
                        className="object-cover rounded-lg shadow-xl border-4 border-gray-200 dark:border-gray-600 w-full h-full"
                        sizes="(max-width: 768px) 80vw, 250px"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT (image on desktop only) */}
              <div className="hidden desktop:flex desktop:w-1/3 items-center justify-center">
                <div className="relative w-full max-w-[250px] aspect-square">
                  <Image
                    src="/images/resume_pics/profile.jpg"
                    alt="Jasper Bonesmo Bates"
                    width={250}
                    height={250}
                    priority
                    className="object-cover rounded-lg shadow-xl border-4 border-gray-200 dark:border-gray-600 w-full h-full"
                    sizes="(max-width: 768px) 80vw, 250px"
                  />
                </div>
              </div>
            </div>
              <hr className="my-10 border-gray-300 dark:border-gray-600" />
              <div className="mt-10">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Experience</h1>

                {resume.experiences.map(
                  ({ id, dates, location, type, position, employer, bullets, link, projectLink }) => (
                    <ProjectResume
                      key={id}
                      dates={dates}
                      location={location}
                      type={type}
                      position={position}
                      employer={employer}
                      bullets={bullets}
                      link={link}
                      projectLink={projectLink}
                    ></ProjectResume>
                  )
                )}
              </div>
              <hr className="my-10 border-gray-300 dark:border-gray-600" />
              <div className="mt-10">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h1>
                {resume.education.map((edu, index) => (
                  <div
                    key={index}
                    className="mt-6 w-full flex flex-col laptop:flex-row laptop:justify-between laptop:items-start gap-4"
                  >
                    {/* LEFT COLUMN (dates/location) — only visible on laptop+ */}
                    <div className="hidden laptop:block w-2/5">
                      <h2 className="text-gray-800 dark:text-gray-200">{edu.dates}</h2>
                      {edu.location && (
                        <p className="text-sm opacity-60 mt-1 text-gray-600 dark:text-gray-400">
                          {edu.location}
                        </p>
                      )}
                    </div>

                    {/* RIGHT COLUMN (main content) */}
                    <div className="w-full laptop:w-3/5">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {edu.projectLink ? (
                          <Link
                            href={edu.projectLink}
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                          >
                            {edu.degree}
                          </Link>
                        ) : (
                          edu.degree
                        )}
                      </h2>

                      <p className="text-base mt-1 text-gray-800 dark:text-gray-200">
                        {edu.university}
                      </p>

                      {/* MOBILE: show dates/location below title */}
                      <div className="laptop:hidden mt-1">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{edu.dates}</p>
                        {edu.location && (
                          <p className="text-sm opacity-60 text-gray-600 dark:text-gray-400">
                            {edu.location}
                          </p>
                        )}
                      </div>

                      {edu.bullets && (
                        <ul className="list-disc mt-2 ml-4">
                          {edu.bullets.split("|").map((bullet, bulletIndex) => (
                            <li
                              key={bulletIndex}
                              className="text-sm my-1 opacity-80 text-gray-800 dark:text-gray-200"
                            >
                              <span dangerouslySetInnerHTML={{ __html: bullet }} />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <hr className="my-10 border-gray-300 dark:border-gray-600" />
              <div className="mt-10">
                  {/* Skills, Languages, Interests */}
                <div className="flex flex-col laptop:flex-row laptop:justify-between laptop:items-start gap-10 laptop:gap-20 w-full overflow-x-hidden">
                  {skills.languages && (
                    <div className="laptop:w-1/3 w-full">
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Languages</h1>
                      <ul className="list-disc mt-2">
                        {(() => {
                          const grouped = {};
                          skills.languages.forEach(lang => {
                            if (typeof lang === "string") {
                              if (!grouped["Other"]) grouped["Other"] = [];
                              grouped["Other"].push(lang);
                            } else {
                              if (!grouped[lang.proficiency]) grouped[lang.proficiency] = [];
                              grouped[lang.proficiency].push(lang.language);
                            }
                          });
                          return Object.entries(grouped).map(([proficiency, languages], index) => (
                            <li key={index} className="ml-5 py-2 text-gray-800 dark:text-gray-200">
                              <span className="font-semibold">{proficiency}:</span> {languages.join(", ")}
                            </li>
                          ));
                        })()}
                      </ul>
                    </div>
                  )}

                  {skills.others && (
                    <div className="laptop:w-1/3 w-full">
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Digital skills</h1>
                      <ul className="list-disc mt-2">
                        {skills.others.map((other, index) => (
                          <li key={index} className="ml-5 py-2 text-gray-800 dark:text-gray-200">
                            {other}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {skills.interests && (
                    <div className="laptop:w-1/3 w-full">
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Interests</h1>
                      <ul className="list-disc mt-2">
                        {skills.interests.map((interest, index) => (
                          <li key={index} className="ml-5 py-2 text-gray-800 dark:text-gray-200">
                            {interest}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Resume;
