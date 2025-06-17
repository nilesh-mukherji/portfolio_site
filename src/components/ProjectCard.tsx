import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../data/projects';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  // Detect light mode
  const isLightMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

  return (
    <div className={`border border-green-400 p-6 rounded-lg transition-all duration-200 flex flex-col space-y-2 ${isLightMode ? 'hover:bg-gray-200' : 'hover:bg-zinc-800'}`}>
      <Link to={`/projects/${project.slug}`} className="block space-y-2 mb-3">
        <h3 className={`${isLightMode ? 'text-blue-900' : 'text-green-400'} text-xl font-bold`}>
          {project.title}
        </h3>
        <p className={`${isLightMode ? 'text-blue-700' : 'text-green-300'} text-sm`}>
          {project.summary}
        </p>
        {project.tech && (
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((tag, i) => (
              <span key={i} className="bg-green-700 text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>

      {/* These links live outside the router Link */}
      <div className={`pt-2 mt-auto flex gap-4 text-sm underline ${isLightMode ? 'text-blue-900' : 'text-green-400'}`}>
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
        {project.quantconnect && (
          <a href={project.quantconnect} target="_blank" rel="noopener noreferrer">
            QuantConnect
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
