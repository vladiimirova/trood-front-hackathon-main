import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import useStore from '../../Store/Store';
import BtnTemp from '../../UI/BtnTemp/BtnTemp';
import { schemaCreate } from '../CreateProjects/CreateComp/CreateValidation';

function ReadyProject() {
  const { projectId } = useParams(); 
  const project = useStore((state) =>
    state.activeProjects.find((p) => p.id === parseInt(projectId)) ||
    state.completedProjects.find((p) => p.id === parseInt(projectId))
  );
  const updateProject = useStore((state) => state.updateProject);
  const { removeProject } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!project) {
      navigate('/'); 
    }
  }, [project, navigate]);


  function handleDelete(projectId) {
    removeProject(projectId); 
    navigate('/'); 
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  function handleEdit(field, value) {
    const updatedProject = { ...project, [field]: value };

    const validationResult = schemaCreate.safeParse(updatedProject);

    if (!validationResult.success) {
      const fieldError = validationResult.error.errors.find(
        (err) => err.path[0] === field
      );
      if (fieldError) {
        alert(fieldError.message); 
        return;
      }
    }

    updateProject(updatedProject);
    localStorage.setItem('activeProjects', JSON.stringify(useStore.getState().activeProjects));
    localStorage.setItem('completedProjects', JSON.stringify(useStore.getState().completedProjects));
  }

  return (
    <div>
      <div className="flex justify-between mb-[32px] font-aeroport">
        <h1 className="font-500 text-[32px]">{project.name}</h1>
        <BtnTemp text={'Delete'} onClick={() => handleDelete(project.id)} />
      </div>

      <div className="bg-white rounded-t-[24px] pt-[55px] pb-[215px] pr-[77px] pl-[59px] font-400 text-[18px]">
        <div className="flex justify-between mb-[24px]">
          <div>
            <p className="mb-[10px]">Field</p>
            <input
              type="text"
              value={project.field}
              onChange={(e) => handleEdit('field', e.target.value)}
              className="p-2 rounded-[8px] border-2 border-solid border-gray-border block w-[285px] h-[61px]"
            />
          </div>
          <div>
            <p className="mb-[10px]">Experience</p>
            <input
              type="text"
              value={project.experience}
              onChange={(e) => handleEdit('experience', e.target.value)}
              className="p-2 rounded-[8px] border-2 border-solid border-gray-border block w-[285px] h-[61px]"
            />
          </div>
          <div>
            <p className="mb-[10px]">Deadline</p>
            <input
              type="text"
              value={project.deadline}
              onChange={(e) => handleEdit('deadline', e.target.value)}
              className="p-2 rounded-[8px] border-2 border-solid border-gray-border block w-[285px] h-[61px]"
            />
          </div>
        </div>

        <div className='mb-[38px]'>
          <p className="mb-[10px]">Description</p>
          <textarea
            value={project.description}
            onChange={(e) => handleEdit('description', e.target.value)}
            className="p-2 rounded-[8px] border-2 border-solid border-gray-border block min-h-[162px] w-full"
          />
        </div>

        <BtnTemp text={'Add vacancy'}/>
      </div>
    </div>
  );
}

export default ReadyProject;
