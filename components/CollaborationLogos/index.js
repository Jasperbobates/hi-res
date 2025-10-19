import React from "react";

const CollaborationLogos = ({ collaborators = [] }) => {
  if (!collaborators || collaborators.length === 0) return null;

  return (
    <div className="mt-8 pt-6">
      <hr className="border-gray-300 dark:border-gray-600 mb-6" />
      <div className="flex flex-col items-end">
        <p className="text-sm text-gray-600 mb-4">In collaboration with:</p>
        <div className="flex flex-wrap justify-end gap-4">
          {collaborators.map((collaborator, index) => (
            <a
              key={index}
              href={collaborator.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-opacity hover:opacity-80 flex flex-col items-center"
            >
              <img
                src={collaborator.logo}
                alt={collaborator.name}
                className="h-12 w-auto object-contain filter grayscale-0 group-hover:grayscale transition-all duration-300"
                title={`Visit ${collaborator.name} website`}
              />
              <span 
                className="text-xs text-gray-500 mt-1 text-center leading-tight"
                style={{
                  maxWidth: '8rem',
                  wordWrap: 'break-word',
                  whiteSpace: 'normal',
                  hyphens: 'auto',
                  overflowWrap: 'break-word'
                }}
              >
                {collaborator.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollaborationLogos;
