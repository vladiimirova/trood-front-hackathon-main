import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../Store/Store';
import { schemaCreate } from '../CreateProjects/CreateComp/CreateValidation';
import BtnTemp from '../../UI/BtnTemp/BtnTemp';

function ReadyProject() {
  const project = useStore((state) => state.project);
  const updateProject = useStore((state) => state.updateProject);
  const navigate = useNavigate();

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

    updateProject({ [field]: value });
  }

  if (!project) {
    return (
      <div>
        Проєкт не знайдено. Повернутись на{' '}
        <button onClick={() => navigate('/')}>головну</button>.
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-[32px] font-aeroport ">
        <h1 className="font-500 text-[32px]">{project.name}</h1>
       <BtnTemp text={'Delete'}/>
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
