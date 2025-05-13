import React from 'react';
import ProjectPage from './ProjectPage';
import { projects } from '../../data/projects';

const Experience = () => {
  return (
    <div>
      {projects.map((project, index) => (
        <ProjectPage key={index} project={project} />
      ))}
    </div>
  );
};

export default Experience;
