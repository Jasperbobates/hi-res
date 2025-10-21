import React from "react";
import Link from "next/link";
import LinkPreview from "../LinkPreview";

const ProjectResume = ({
  dates,
  location,
  position,
  employer,
  bullets,
  link,
  projectLink,
}) => {
  return (
    <div className="w-full flex flex-col laptop:flex-row laptop:justify-between laptop:items-start mt-6 gap-4">
      {/* LEFT SIDE: Dates / Location (desktop only) */}
      <div className="hidden laptop:block w-2/5">
        <p className="text-gray-800 dark:text-gray-200">{dates}</p>
        {location && (
          <p className="text-sm opacity-60 mt-1 text-gray-600 dark:text-gray-400">
            {location}
          </p>
        )}
      </div>

      {/* RIGHT SIDE: Position, Employer, Bullets */}
      <div className="w-full laptop:w-3/5">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {position}
        </h2>
        <p className="text-base font-medium text-gray-800 dark:text-gray-200">
          {employer}
        </p>

        {/* MOBILE: Dates + Location under employer */}
        <div className="laptop:hidden mt-1">
          <p className="text-sm text-gray-700 dark:text-gray-300">{dates}</p>
          {location && (
            <p className="text-sm opacity-60 text-gray-600 dark:text-gray-400">
              {location}
            </p>
          )}
        </div>

        {bullets && (
          <ul className="list-disc mt-2 ml-4">
            {bullets.split("|").map((b, i) => (
              <li
                key={i}
                className="text-sm my-1 opacity-80 text-gray-800 dark:text-gray-200"
              >
                <span dangerouslySetInnerHTML={{ __html: b }} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectResume;