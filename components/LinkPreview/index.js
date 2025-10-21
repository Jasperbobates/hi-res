import React from "react";
import Image from "next/image";

const LinkPreview = ({ link, showHeader = true }) => {
  if (!link) return null;

  const getLinkIcon = (url) => {
    if (url.includes('cpb.nl')) {
      return (
        <div className="w-12 h-12 relative">
          <Image src="/images/preview_pics/CPB_publication.png" alt="CPB Publication" layout="fill" objectFit="contain" className="rounded" />
        </div>
      );
    }
    if (url.includes('1drv.ms') || url.includes('onedrive')) {
      return (
        <div className="w-12 h-12 relative">
          <Image src="/images/preview_pics/Thesis_cover.jpg" alt="Master's Thesis" layout="fill" objectFit="cover" className="rounded" />
        </div>
      );
    }
    return (
      <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <div className="mb-6 flex flex-col items-center">
      {showHeader && <p className="text-sm text-gray-600 mb-4">Read the full report here:</p>}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 max-w-md w-full">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {getLinkIcon(link.url)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {link.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {link.description && (
                  <span className="block">{link.description}</span>
                )}
                <span className="text-gray-400">
                  {link.type || 'External Link'}
                </span>
              </p>
            </div>
            <div className="flex-shrink-0">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default LinkPreview;
