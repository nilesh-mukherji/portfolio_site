// src/pages/ProjectDetail.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import ReactMarkdown from 'react-markdown';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

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

      <ReactMarkdown className="prose prose-invert max-w-none">
        {project.content}
      </ReactMarkdown>

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
