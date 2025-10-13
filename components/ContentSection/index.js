import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const CodeBlock = {
  code({ node, inline, className, children, ...props }) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

const ContentSection = ({ content }) => {
  return (
    <ReactMarkdown components={CodeBlock} rehypePlugins={[rehypeRaw]} className="markdown-class">
      {content}
    </ReactMarkdown>
  );
};

export default ContentSection;
