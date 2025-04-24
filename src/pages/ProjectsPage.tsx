import React from 'react';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';

const ProjectsPage: React.FC = () => {
  return (
    <div className="bg-black text-green-400 min-h-screen p-8 font-mono">
      <h1 className="text-3xl text-green-300 mb-6">&gt; All Projects</h1>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* Back Button */}
      <div className="w-full flex justify-start">
        <Link
          to="/?skipIntro=true"
          className="text-green-400 border border-green-400 px-4 py-2 rounded hover:bg-green-400 hover:text-black transition-colors duration-200 font-mono text-sm"
        >
          &gt; back
        </Link>
      </div>
    </div>
  );
};

export default ProjectsPage;
