// src/pages/ProjectDetail.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading for 1 second
    return () => clearTimeout(timer);
  }, []);

  const project = projects.find((p) => p.slug === slug);

  if (loading) {
    return (
      <div className="bg-black text-green-400 min-h-screen flex items-center justify-center font-mono">
        <p className="text-2xl">&gt; establishing connection... <span className="animate-pulse">|</span></p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-black text-red-400 font-mono min-h-screen p-8">
        <h1 className="text-2xl">404 – Project Not Found</h1>
      </div>
    );
  }

  return (
    <div className="bg-black text-green-400 font-mono min-h-screen p-8">
      <h1 className="text-3xl text-green-300 mb-2">{project.title}</h1>
      <p className="text-green-200 mb-4">{project.summary}</p>
      
      {project.tech && (
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tag, i) => (
            <span key={i} className="bg-green-700 text-xs px-2 py-1 rounded">{tag}</span>
          ))}
        </div>
      )}
      
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown
          skipHtml={false}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {project.content.trim()}
        </ReactMarkdown>
      </div>

      <div className="mt-8 space-x-4">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="underline">
            GitHub
          </a>
        )}
        {project.quantconnect && (
          <a href={project.quantconnect} target="_blank" rel="noopener noreferrer" className="underline">
            QuantConnect
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
