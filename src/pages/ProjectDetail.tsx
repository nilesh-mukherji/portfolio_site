// src/pages/ProjectDetail.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  // Detect light or dark mode
  const isLightMode =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading for 1 second
    return () => clearTimeout(timer);
  }, []);

  const project = projects.find((p) => p.slug === slug);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center font-mono ${isLightMode ? 'bg-white text-blue-900' : 'bg-black text-green-400'}`}>
        <p className="text-2xl">
          &gt; establishing connection... <span className="animate-pulse">|</span>
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={`min-h-screen p-8 font-mono ${isLightMode ? 'bg-white text-red-600' : 'bg-black text-red-400'}`}>
        <h1 className="text-2xl">404 – Project Not Found</h1>
      </div>
    );
  }

  return (
    <div className={`p-8 font-mono min-h-screen ${isLightMode ? 'bg-white text-black' : 'bg-black text-green-400'}`}>
      <h1 className={`text-3xl mb-2 ${isLightMode ? 'text-blue-900' : 'text-green-300'}`}>
        {project.title}
      </h1>
      <p className={`mb-4 ${isLightMode ? 'text-blue-700' : 'text-green-200'}`}>
        {project.summary}
      </p>
      
      {project.tech && (
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tag, i) => (
            <span key={i} className={`text-xs px-2 py-1 rounded ${isLightMode ? 'bg-blue-300 text-blue-900' : 'bg-green-700'}`}>
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="prose max-w-none">
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
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="underline">
            Demo
          </a>
        )}
      </div>
      {project.presentation && (
        <div className="mt-8">
          <h2 className="text-2xl mb-4">Presentation</h2>
          <iframe
            src={`${process.env.PUBLIC_URL}/assets/${project.presentation}`}
            title="Project Presentation"
            className="w-full h-96"
          />
        </div>
      )}
      {/* Thematic Back Button */}
      <div className="mt-8">
        <Link
          to="/projects"
          className="px-6 py-3 border border-green-400 text-green-400 rounded hover:bg-green-400 hover:text-black transition-colors duration-300 font-mono text-sm"
        >
          &gt; back to projects
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetail;
