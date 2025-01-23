import React, { useEffect } from 'react';
import useStore from '../../Store/Store';
import BtnTemp from '../../UI/BtnTemp/BtnTemp';
import Creating from './DashboardComp/ActiveProjects/Creating'; 
import Analyzing from './DashboardComp/ActiveProjects/Analyzing'; 
import PassedComp from './DashboardComp/PassedProjects/PassedComp'; 
import ProjectCard from './DashboardComp/ProjectCard/ProjectCard'; 

const projectComponents = {
  Creating: <Creating />,
  Analyzing: <Analyzing />,
  PassedComp: <PassedComp />,
};

function Dashboard() {
  const { activeProjects, completedProjects, setActiveProjects, setCompletedProjects } = useStore();

  useEffect(() => {
    const storedActiveProjects = JSON.parse(localStorage.getItem('activeProjects')) || [
      { id: 1, name: 'Creating' },
      { id: 2, name: 'Analyzing' },
    ];
    const storedCompletedProjects = JSON.parse(localStorage.getItem('completedProjects')) || [
      { id: 3, name: 'PassedComp' },
    ];

    setActiveProjects(storedActiveProjects);
    setCompletedProjects(storedCompletedProjects);
  }, [setActiveProjects, setCompletedProjects]);

  useEffect(() => {
    localStorage.setItem('activeProjects', JSON.stringify(activeProjects));
    localStorage.setItem('completedProjects', JSON.stringify(completedProjects));
  }, [activeProjects, completedProjects]);

  return (
    <div>
      <div className="flex justify-between mb-[32px]">
        <h1 className="font-aeroport font-500 text-[32px]">Active projects</h1>
        <BtnTemp to={'/create'} text={'Create project'} />
      </div>

      <div className="flex flex-wrap gap-[30px] justify-between">
        {activeProjects.length === 0 ? (
          <p>No active projects</p>
        ) : (
          activeProjects.map((project) => (
            <div key={project.id}>
              {projectComponents[project.name] || <ProjectCard project={project} />}
            </div>
          ))
        )}
      </div>

      <div className="mt-[40px] mb-[150px]">
        <h1 className="font-aeroport font-500 text-[32px] mb-[32px]">Passed projects</h1>
        <div className="flex flex-wrap gap-[30px] justify-between">
          {completedProjects.length === 0 ? (
            <p>No completed projects</p>
          ) : (
            completedProjects.map((project) => (
              <div key={project.id}>
                {projectComponents[project.name] || <ProjectCard project={project} />}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
