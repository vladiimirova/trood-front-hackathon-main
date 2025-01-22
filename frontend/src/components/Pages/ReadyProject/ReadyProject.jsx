import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../../Store/Store';
import BtnTemp from '../../UI/BtnTemp/BtnTemp';
import { schemaCreate } from '../CreateProjects/CreateComp/CreateValidation';

function ReadyProject() {
  const { projectId } = useParams();
  const project = useStore(
    (state) =>
      state.activeProjects.find((p) => p.id === parseInt(projectId)) ||
      state.completedProjects.find((p) => p.id === parseInt(projectId))
  );
  const updateProject = useStore((state) => state.updateProject);
  const { removeProject } = useStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    field: '',
    experience: '',
    deadline: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!project) {
      navigate('/');
    } else {
      setFormData({
        field: project.field || '',
        experience: project.experience || '',
        deadline: project.deadline || '',
        description: project.description || '',
      });
    }
  }, [project, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationResult = schemaCreate.safeParse(formData);

    if (!validationResult.success) {
      const newErrors = {};
      validationResult.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    updateProject({ ...project, ...formData });
    localStorage.setItem(
      'activeProjects',
      JSON.stringify(useStore.getState().activeProjects)
    );
    localStorage.setItem(
      'completedProjects',
      JSON.stringify(useStore.getState().completedProjects)
    );
    navigate('/');
  };

  const handleDelete = () => {
    removeProject(project.id);
    navigate('/');
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-[32px] font-aeroport">
        <h1 className="font-500 text-[32px]">{project.name}</h1>
        <BtnTemp text={'Delete'} onClick={handleDelete} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-t-[24px] pt-[55px] pb-[215px] pr-[77px] pl-[59px] font-400 text-[18px]"
      >
        <div className="flex justify-between mb-[4px]">
          <div className="relative">
            <label htmlFor="field" className="mb-[10px] block">
              Field
            </label>
            <select
              id="field"
              name="field"
              value={formData.field}
              onChange={handleChange}
              className="p-2 rounded-[8px] border-2 border-solid border-gray-border block w-[285px] h-[61px] focus:outline-none focus:ring-2 appearance-none"
            >
              <option value="">Select Field</option>
              <option value="Design">Design</option>
              <option value="Development">Development</option>
              <option value="Marketing">Marketing</option>
            </select>
            <span className="absolute right-[15px] top-[55px] transform -translate-y-1/2 pointer-events-none">
              <img
                src="./icons/ep_arrow-up-bold.svg"
                alt="arrow"
                className="w-[20px] h-[20px]"
              />
            </span>
            <div className="h-[20px]">
              {errors.field && (
                <p className="text-red-500 text-sm">{errors.field}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="experience" className="mb-[10px] block">
              Experience
            </label>
            <input
              id="experience"
              name="experience"
              type="text"
              value={formData.experience}
              onChange={handleChange}
              className="p-2 rounded-[8px] border-2 border-solid border-gray-border block w-[285px] h-[61px]"
            />
            <div className="h-[20px]">
              {errors.experience && (
                <p className="text-red-500 text-sm">{errors.experience}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="deadline" className="mb-[10px] block">
              Deadline
            </label>
            <input
              id="deadline"
              name="deadline"
              type="text"
              value={formData.deadline}
              onChange={handleChange}
              className="p-2 rounded-[8px] border-2 border-solid border-gray-border block w-[285px] h-[61px]"
            />
            <div className="h-[20px]">
              {errors.deadline && (
                <p className="text-red-500 text-sm">{errors.deadline}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-[18px]">
          <label htmlFor="description" className="mb-[10px] block">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 rounded-[8px] border-2 border-solid border-gray-border block min-h-[162px] w-full"
          />
          <div className="h-[20px]">
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
        </div>

        <BtnTemp text={'Add vacancy'} />
      </form>
    </div>
  );
}

export default ReadyProject;
