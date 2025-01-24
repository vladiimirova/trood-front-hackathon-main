import { create } from 'zustand';

const API_URL = 'http://localhost:8081/http://localhost:8080';

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const useStore = create((set) => ({
  activeProjects: loadFromLocalStorage('activeProjects') || [],
  completedProjects: loadFromLocalStorage('completedProjects') || [],
  savedFields: loadFromLocalStorage('savedFields') || {},

  fetchProjects: async () => {
    try {
      const response = await fetch(`${API_URL}/projects`);
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }

      const allProjects = await response.json();
      const today = new Date();
      today.setDate(today.getDate() - 1);

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

      const savedFields = {};
      allProjects.forEach((project) => {
        const field = localStorage.getItem(`field-${project.id}`);
        if (field) {
          savedFields[project.id] = field;
        }
      });

      saveToLocalStorage('activeProjects', activeProjects);
      saveToLocalStorage('completedProjects', completedProjects);
      saveToLocalStorage('savedFields', savedFields);

      set({ activeProjects, completedProjects, savedFields });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  },

  addProject: async (project) => {
    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        const newProject = await response.json();
        const today = new Date();
        today.setDate(today.getDate() - 1);
        const isCompleted = new Date(newProject.deadline) <= today;

        set((state) => {
          const updatedActiveProjects = isCompleted
            ? state.activeProjects
            : [...state.activeProjects, newProject];
          const updatedCompletedProjects = isCompleted
            ? [...state.completedProjects, newProject]
            : state.completedProjects;

          saveToLocalStorage('activeProjects', updatedActiveProjects);
          saveToLocalStorage('completedProjects', updatedCompletedProjects);

          return {
            activeProjects: updatedActiveProjects,
            completedProjects: updatedCompletedProjects,
          };
        });

        return newProject;
      } else {
        throw new Error('Failed to add project');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  },

  updateProject: async (updatedProject) => {
    try {
      const response = await fetch(`${API_URL}/projects/${updatedProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject),
      });

      if (response.ok) {
        const updatedData = await response.json();
        const today = new Date();
        today.setDate(today.getDate() - 1);
        const isCompleted = new Date(updatedData.deadline) <= today;

        set((state) => {
          const updatedActiveProjects = isCompleted
            ? state.activeProjects.filter((p) => p.id !== updatedData.id)
            : state.activeProjects.map((p) =>
                p.id === updatedData.id ? updatedData : p
              );
          const updatedCompletedProjects = isCompleted
            ? state.completedProjects.map((p) =>
                p.id === updatedData.id ? updatedData : p
              )
            : state.completedProjects.filter((p) => p.id !== updatedData.id);

          saveToLocalStorage('activeProjects', updatedActiveProjects);
          saveToLocalStorage('completedProjects', updatedCompletedProjects);

          return {
            activeProjects: updatedActiveProjects,
            completedProjects: updatedCompletedProjects,
          };
        });
      } else {
        console.error('Failed to update project', response.statusText);
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  },

  removeProject: async (projectId) => {
    try {
      const response = await fetch(`${API_URL}/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        set((state) => {
          const updatedActiveProjects = state.activeProjects.filter(
            (p) => p.id !== projectId
          );
          const updatedCompletedProjects = state.completedProjects.filter(
            (p) => p.id !== projectId
          );

          saveToLocalStorage('activeProjects', updatedActiveProjects);
          saveToLocalStorage('completedProjects', updatedCompletedProjects);

          return {
            activeProjects: updatedActiveProjects,
            completedProjects: updatedCompletedProjects,
          };
        });
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  },
}));

export default useStore;
