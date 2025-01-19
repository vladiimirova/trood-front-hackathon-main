import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaCreate } from './CreateValidation';
import { useNavigate } from 'react-router-dom';

function CreateForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schemaCreate),
  });

  const navigate = useNavigate();

  function onSubmit(data) {
    if (Object.keys(errors).length > 0) {
      console.log('There are validation errors, the form will not be submitted.');
      alert('Please correct the errors in the form.');
      return;
    }

    navigate('/'); 
  }

  return (
    <div className="bg-white pt-[55px] pb-[215px] pr-[77px] pl-[59px]">
      <form onSubmit={handleSubmit(onSubmit)} className="font-aeroport font-400 text-[18px]">
        
        <div className="flex justify-between gap-[37px]">
          <div>
            <label htmlFor="name" className="mb-[10px]">Name</label>
            <input
              id="name"  
              type="text"
              {...register('name')}
              className="mt-1 p-2 rounded-[8px] border-2 border-solid border-gray-border block w-[424px]"
            />
            <div className="h-[20px]"> 
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="relative">
            <label htmlFor="field" className="mb-[10px]">Field</label>
            <select
              id="field"  
              {...register('field')}
              className="mt-1 p-2 rounded-[8px] border-2 border-solid border-gray-border block w-[424px] focus:outline-none focus:ring-2 appearance-none"
            >
              <option value=""></option>
              <option value="ukraine">Design</option>
              <option value="poland">Development</option>
              <option value="germany">Marketing</option>
            </select>
            <span className="absolute right-[15px] top-[55px] transform -translate-y-1/2 pointer-events-none">
              <img
                src="./icons/ep_arrow-up-bold.svg"
                alt="ep_arrow-up-bold"
                className="w-[20px] h-[20px]"
              />
            </span>
            <div className="h-[20px]">
              {errors.field && (
                <p className="text-red-500 text-sm">{errors.field.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-[37px] mb-[28px]">
          <div>
            <label htmlFor="experience" className="mb-[10px]">Experience</label>
            <input
              id="experience"  
              type="text"
              {...register('experience')}
              className="mt-1 p-2 rounded-[8px] border-2 border-solid border-gray-border block w-[424px]"
            />
            <div className="h-[20px]">
              {errors.experience && (
                <p className="text-red-500 text-sm">{errors.experience.message}</p>
              )}
            </div>
          </div>

          <div className="relative">
            <label htmlFor="deadline" className="mb-[10px]">Deadline</label>
            <input
              id="deadline"  
              type="text"
              {...register('deadline')}
              className="mt-1 p-2 rounded-[8px] border-2 border-solid border-gray-border block w-[424px]"
            />
            <div className="h-[20px]">
              {errors.deadline && (
                <p className="text-red-500 text-sm">{errors.deadline.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-[15px]">
          <label htmlFor="description" className="mb-[10px]">Description</label>
          <input
            id="description" 
            type="text"
            {...register('description')}
            className="mt-1 p-2 rounded-[8px] w-full border-2 border-solid border-gray-border min-h-[162px]"
          />
          <div className="h-[20px]"> 
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="font-aeroport font-medium text-[20px] text-black rounded-[24px] w-[186px] h-[47px] inline-flex items-center justify-center text-center bg-gray"
          >
            Create project
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateForm;
