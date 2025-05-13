// components/ProjectPage.jsx
import React from 'react';

const ProjectPage  = ({ project }) => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-lg text-gray-600 mb-6">{project.tagline}</p>
        <img
          src={project.image}
          alt="Project screenshot"
          className="rounded-lg shadow-lg mx-auto"
        />
        <div className="mt-6 flex justify-center gap-4">
          <a
            href={project.demoLink}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo
          </a>
          <a
            href={project.codeLink}
            className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Code
          </a>
        </div>
      </section>

      {/* Overview */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Project Overview</h2>
        <p className="text-gray-700">{project.overview}</p>
      </section>

      {/* Tech Stack */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Tech Stack</h2>
        <ul className="flex flex-wrap gap-4">
          {project.techStack.map((tech) => (
            <li key={tech} className="bg-gray-100 px-3 py-1 rounded text-sm">
              {tech}
            </li>
          ))}
        </ul>
      </section>

      {/* Key Features */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {project.features.map((f, idx) => (
            <li key={idx}>{f}</li>
          ))}
        </ul>
      </section>

      {/* Challenges */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Challenges & Solutions</h2>
        {project.challenges.map((para, idx) => (
          <p className="text-gray-700 mb-2" key={idx}>
            {para}
          </p>
        ))}
      </section>

      {/* Learnings */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">What I Learned</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {project.learnings.map((l, idx) => (
            <li key={idx}>{l}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ProjectPage ;
