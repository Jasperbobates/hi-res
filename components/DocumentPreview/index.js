import React from "react";
import Image from "next/image";

const DocumentPreview = ({ document }) => {
  if (!document) return null;

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (filename) => {
    // Use thesis cover image for all documents
    return (
      <div className="w-16 h-16 relative">
        <Image src="/images/preview_pics/Thesis_cover.jpg" 
              alt="Document Cover" 
              fill 
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: "cover" }} 
              className="rounded border-2 border-gray-300 dark:border-gray-600" />
      </div>
    );
  };

  return (
    <div className="mb-6 flex flex-col items-center">
      <p className="text-sm text-gray-600 mb-4">Download the full report here:</p>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 max-w-md">
        <div className="flex items-center space-x-3 p-4">
          <div className="flex-shrink-0 flex items-center justify-center">
            {getFileIcon(document.filename)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <h4 className="text-sm font-medium text-gray-900 leading-tight pr-2 whitespace-pre-line">
                {(document.title || document.filename).replace('?', '?\n')}
              </h4>
              <a
                href={document.url}
                download={document.filename}
                className="ml-2 flex-shrink-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                Download
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {document.description && (
                <span className="block">{document.description}</span>
              )}
              <span className="text-gray-400">
                {formatFileSize(document.size)} • {document.type || 'PDF Document'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
