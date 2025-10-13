import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import Cursor from "../components/Cursor"; // Disabled - blocks all clicks
import Header from "../components/Header";
import ProjectResume from "../components/ProjectResume";
import Socials from "../components/Socials";
import { useTheme } from "next-themes";
// Data
import { name, showResume, resume, skills } from "../data/portfolio.json";
import data from "../data/portfolio.json";

const Resume = () => {
  const router = useRouter();
  const theme = useTheme();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    if (!showResume) {
      router.push("/");
    }
  }, []);
  return (
    <>
      <div
        className={`container mx-auto mb-10`}
      >
        <Header isBlog />
        {mount && (
          <div className="mt-10 w-full flex flex-col items-center">
            <div
              className={`w-full ${
                mount && theme.theme === "dark" ? "bg-slate-800" : "bg-gray-50"
              } max-w-4xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm`}
            >
              <h1 className="text-3xl font-bold">Jasper Bonesmo Bates</h1>
              <h2 className="text-xl mt-5">{resume.tagline}</h2>
              <h2 className="w-4/5 text-xl mt-5 opacity-50">
                {resume.description}
              </h2>
              <div className="mt-2">
                <Socials />
              </div>
              <hr className="my-10 border-gray-300 dark:border-gray-600" />
              <div className="mt-10">
                <h1 className="text-2xl font-bold">Experience</h1>

                {resume.experiences.map(
                  ({ id, dates, location, type, position, employer, bullets }) => (
                    <ProjectResume
                      key={id}
                      dates={dates}
                      location={location}
                      type={type}
                      position={position}
                      employer={employer}
                      bullets={bullets}
                    ></ProjectResume>
                  )
                )}
              </div>
              <hr className="my-10 border-gray-300 dark:border-gray-600" />
              <div className="mt-10">
                <h1 className="text-2xl font-bold">Education</h1>
                {resume.education.map((edu, index) => (
                  <div key={index} className="mt-5 w-full flex mob:flex-col desktop:flex-row justify-between">
                    <div className="text-lg w-2/5">
                      <h2>{edu.dates}</h2>
                      {edu.location && (
                        <p className="text-sm opacity-40 mt-1">{edu.location}</p>
                      )}
                    </div>
                    <div className="w-3/5">
                      <h2 className="text-lg font-bold">{edu.degree}</h2>
                      <p className="text-base mt-1 opacity-50">
                        {edu.university}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="my-10 border-gray-300 dark:border-gray-600" />
              <div className="mt-10">
                <div className="flex mob:flex-col desktop:flex-row justify-start gap-20">
                  {skills.languages && (
                    <div className="mob:mt-5">
                      <h1 className="text-2xl font-bold">Languages</h1>
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
                            <li key={index} className="ml-5 py-2">
                              <span className="font-semibold">{proficiency}:</span> {languages.join(', ')}
                            </li>
                          ));
                        })()}
                      </ul>
                    </div>
                  )}

                  {skills.others && (
                    <div className="mob:mt-5">
                      <h1 className="text-2xl font-bold">Digital skills</h1>
                      <ul className="list-disc mt-2">
                        {skills.others.map((other, index) => (
                          <li key={index} className="ml-5 py-2">
                            {other}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {skills.interests && (
                    <div className="mob:mt-5">
                      <h1 className="text-2xl font-bold">Interests</h1>
                      <ul className="list-disc mt-2">
                        {skills.interests.map((interest, index) => (
                          <li key={index} className="ml-5 py-2">
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
