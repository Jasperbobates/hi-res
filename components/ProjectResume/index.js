import React from "react";
import Link from "next/link";
import LinkPreview from "../LinkPreview";

const ProjectResume = ({ dates, location, type, position, employer, bullets, link, projectLink }) => {
  const [bulletsLocal, setBulletsLocal] = React.useState(bullets.split("|"));

  return (
    <div className="mt-5 w-full flex mob:flex-col desktop:flex-row justify-between">
      <div className="text-lg w-2/5 mob:w-full desktop:w-2/5 mob:hidden desktop:block">
        <h2 className="text-gray-800 dark:text-gray-200">{dates}</h2>
        {location && (
          <p className="text-sm opacity-40 mt-1 text-gray-600 dark:text-gray-400">{location}</p>
        )}
        <h3 className="text-sm opacity-50 text-gray-700 dark:text-gray-300">{type}</h3>
      </div>
      <div className="w-3/5 mob:w-full desktop:w-3/5 mob:mt-2 desktop:mt-0">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {projectLink ? (
            <Link href={projectLink} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              {position}
            </Link>
          ) : (
            position
          )}
        </h2>
        {employer && (
          <p className="text-base mt-1 opacity-50 text-gray-700 dark:text-gray-300">{employer}</p>
        )}
        <div className="text-lg mob:block desktop:hidden mt-2">
          <h2 className="text-gray-800 dark:text-gray-200">{dates}</h2>
          {location && (
            <p className="text-sm opacity-40 mt-1 text-gray-600 dark:text-gray-400">{location}</p>
          )}
          <h3 className="text-sm opacity-50 text-gray-700 dark:text-gray-300">{type}</h3>
        </div>
        {bulletsLocal && bulletsLocal.length > 0 && (
          <ul className="list-disc mt-2 ml-4">
            {bulletsLocal.map((bullet, index) => (
              <li key={index} className="text-sm my-1 opacity-70 text-gray-800 dark:text-gray-200">
                <span dangerouslySetInnerHTML={{ __html: bullet }} />
              </li>
            ))}
          </ul>
        )}
        {link && <LinkPreview link={link} showHeader={false} />}
      </div>
    </div>
  );
};

export default ProjectResume;
