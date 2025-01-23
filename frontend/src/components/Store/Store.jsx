import { create } from 'zustand';

const API_URL = 'http://localhost:8081/http://localhost:8080'; 

const useStore = create((set) => ({
  activeProjects: [],
  completedProjects: [],

  savedFields: {},

  fetchProjects: async () => {
    try {
      const response = await fetch(`${API_URL}/projects`);
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }

      const allProjects = await response.json();
      console.log('All Projects:', allProjects); 

      const today = new Date();
      today.setDate(today.getDate() - 1); 
      console.log('Today:', today);

      const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('.');
        return new Date(`${year}-${month}-${day}`);
      };

      const activeProjects = allProjects.filter(
        (project) => parseDate(project.deadline) > today
      );

      const completedProjects = allProjects.filter(
        (project) => parseDate(project.deadline) <= today
      );

      console.log('Active Projects:', activeProjects); 
      console.log('Completed Projects:', completedProjects); 

      const savedFields = {};
      allProjects.forEach((project) => {
        const field = localStorage.getItem(`field-${project.id}`);
        if (field) {
          savedFields[project.id] = field;
        }
      });
        set({ activeProjects, completedProjects, savedFields });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  },

  addProject: async (project) => {
    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...project,
          field: localStorage.getItem('projectField'),
        }),
      });
  
      if (response.ok) {
        const newProject = await response.json();
  
        if (!newProject || !newProject.id) {
          throw new Error('Project ID is missing');
        }
  
        const today = new Date();
        today.setDate(today.getDate() - 1); 
        const isCompleted = new Date(newProject.deadline) <= today;
  
        set((state) => ({
          activeProjects: isCompleted
            ? state.activeProjects
            : [...state.activeProjects, newProject], 
          completedProjects: isCompleted
            ? [...state.completedProjects, newProject]  
            : state.completedProjects,
            savedFields: {
              ...state.savedFields,
              [newProject.id]: localStorage.getItem('projectField') || '', 
            },
        }));
  
        return newProject;
      } else {
        throw new Error('Failed to add project');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Error while adding the project: ' + error.message);  
      throw error; 
    }
  },
  

  updateProject: async (updatedProject) => {
    console.log('Updating project with data:', updatedProject);
    try {
      const response = await fetch(`${API_URL}/projects/${updatedProject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updatedProject,
          field: localStorage.getItem('projectField'),
        }),
      });
  
      if (response.ok) {
        const updatedData = await response.json();
        console.log("Updated data from server:", updatedData);
  
        const today = new Date();
        today.setDate(today.getDate() - 1);
        const isCompleted = new Date(updatedData.deadline) <= today;
  
        set((state) => ({
          activeProjects: isCompleted
            ? state.activeProjects.filter((p) => p.id !== updatedData.id)
            : state.activeProjects.map((p) =>
                p.id === updatedData.id ? updatedData : p
              ),
          completedProjects: isCompleted
            ? state.completedProjects.map((p) =>
                p.id === updatedData.id ? updatedData : p
              )
            : state.completedProjects.filter((p) => p.id !== updatedData.id),
            savedFields: {
              ...state.savedFields,
              [updatedData.id]: localStorage.getItem('projectField') || '', 
            },
        }));
      } else {
        console.error('Failed to update project', response.statusText);
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  },

  setField: (field, projectId) => {
    localStorage.setItem('projectField', field);
    set((state) => ({
      savedFields: {
        ...state.savedFields,
        [projectId]: field, 
      },
    }));
  },

  removeProject: async (projectId) => {
    try {
      const response = await fetch(`${API_URL}/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        set((state) => ({
          activeProjects: state.activeProjects.filter(
            (p) => p.id !== projectId
          ),
          completedProjects: state.completedProjects.filter(
            (p) => p.id !== projectId
          ),
          savedFields: {
            ...state.savedFields,
            [projectId]: undefined, 
          },
        }));
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  },
}));

export default useStore;
