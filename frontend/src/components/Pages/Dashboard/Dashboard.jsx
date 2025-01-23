import React, { useEffect } from 'react';
import useStore from '../../Store/Store';
import BtnTemp from '../../UI/BtnTemp/BtnTemp';
import Creating from './DashboardComp/ActiveProjects/Creating';
import Analyzing from './DashboardComp/ActiveProjects/Analyzing';
import PassedComp from './DashboardComp/PassedProjects/PassedComp';
import ProjectCard from './DashboardComp/ProjectCard/ProjectCard';

function Dashboard() {
  const { activeProjects, completedProjects, fetchProjects } = useStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  const savedField = useStore((state) => state.savedField);

  return (
    <div>
      <div className="flex justify-between mb-[32px]">
        <h1 className="font-aeroport font-500 text-[32px]">Active projects</h1>
        <BtnTemp to={'/create'} text={'Create project'} />
      </div>

      <div className="flex flex-wrap gap-[30px] justify-between">
        <Creating />
        <Analyzing />
        {activeProjects.length > 0 &&
          activeProjects.map((project) => (
            <div key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
      </div>

      <div className="mt-[40px] mb-[150px]">
        <h1 className="font-aeroport font-500 text-[32px] mb-[32px]">
          Passed projects
        </h1>
        <div className="flex flex-wrap gap-[30px] justify-between">
          <PassedComp />
          {completedProjects.length > 0 &&
            completedProjects.map((project) => (
              <div key={project.id}>
                <ProjectCard project={project}/>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
