import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// Removed unused Cursor import
import Header from "../components/Header";
import ProjectResume from "../components/ProjectResume";
import Socials from "../components/Socials";
import { useTheme } from "next-themes";
// Data
import { name, showResume, resume, skills } from "../data/portfolio.json";
import data from "../data/portfolio.json";

const Resume = () => {
  const router = useRouter();
  const { theme, resolvedTheme } = useTheme();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    if (!showResume) {
      router.push("/");
    }
  }, []);
  return (
    <>
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>
      <div
        className={`container mx-auto mb-10 px-4 mob:px-4 desktop:px-8`}
      >
        <Header isBlog isResume={true} />
        {mount && (
          <div className="mt-10 w-full flex flex-col items-center">
            <div
              className={`w-full ${
                resolvedTheme === "dark" ? "bg-slate-800" : "bg-gray-50"
              } max-w-4xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm transition-colors duration-200`}
            >
              <div className="flex mob:flex-col desktop:flex-row gap-12">
                <div className="desktop:w-2/3 mob:w-full">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Jasper Bonesmo Bates</h1>
                  <h2 className="text-xl mt-5 text-gray-800 dark:text-gray-200">{resume.tagline}</h2>
                  <h2 className="w-4/5 text-xl mt-5 opacity-50 text-gray-700 dark:text-gray-300">
                    {resume.description}
                  </h2>
                  <div className="mt-2">
                    <Socials />
                  </div>
                </div>
                <div className="desktop:w-1/3 mob:w-full flex items-center justify-center">
                  <img
                    src="/images/resume_pics/profile.jpg"
                    alt="Jasper Bonesmo Bates"
                    className="w-80 h-80 mob:w-64 mob:h-64 rounded-lg object-cover shadow-xl border-4 border-gray-200 dark:border-gray-600"
                  />
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
                  <div key={index} className="mt-5 w-full flex mob:flex-col desktop:flex-row justify-between">
                    <div className="text-lg w-2/5 mob:w-full desktop:w-2/5 mob:hidden desktop:block">
                      <h2 className="text-gray-800 dark:text-gray-200">{edu.dates}</h2>
                      {edu.location && (
                        <p className="text-sm opacity-40 mt-1 text-gray-600 dark:text-gray-400">{edu.location}</p>
                      )}
                    </div>
                    <div className="w-3/5 mob:w-full desktop:w-3/5 mob:mt-2 desktop:mt-0">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {edu.projectLink ? (
                          <Link href={edu.projectLink} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                            {edu.degree}
                          </Link>
                        ) : (
                          edu.degree
                        )}
                      </h2>
                      <p className="text-base mt-1 opacity-50 text-gray-700 dark:text-gray-300">
                        {edu.university}
                      </p>
                      <div className="text-lg mob:block desktop:hidden mt-2">
                        <h2 className="text-gray-800 dark:text-gray-200">{edu.dates}</h2>
                        {edu.location && (
                          <p className="text-sm opacity-40 mt-1 text-gray-600 dark:text-gray-400">{edu.location}</p>
                        )}
                      </div>
                      {edu.bullets && (
                        <ul className="list-disc mt-2 ml-4">
                          {edu.bullets.split('|').map((bullet, bulletIndex) => (
                            <li key={bulletIndex} className="text-sm my-1 opacity-70 text-gray-800 dark:text-gray-200">
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
                <div className="flex mob:flex-col desktop:flex-row justify-start gap-20">
                  {skills.languages && (
                    <div className="mob:mt-5">
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Languages</h1>
                      <ul className="list-disc mt-2">
                        {(() => {
                          // Group languages by proficiency
                          const grouped = {};
                          skills.languages.forEach(lang => {
                            if (typeof lang === 'string') {
                              if (!grouped['Other']) grouped['Other'] = [];
                              grouped['Other'].push(lang);
                            } else {
                              if (!grouped[lang.proficiency]) grouped[lang.proficiency] = [];
                              grouped[lang.proficiency].push(lang.language);
                            }
                          });
                          // Render grouped languages
                          return Object.entries(grouped).map(([proficiency, languages], index) => (
                            <li key={index} className="ml-5 py-2 text-gray-800 dark:text-gray-200">
                              <span className="font-semibold">{proficiency}:</span> {languages.join(', ')}
                            </li>
                          ));
                        })()}
                      </ul>
                    </div>
                  )}

                  {skills.others && (
                    <div className="mob:mt-5">
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
                    <div className="mob:mt-5">
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
