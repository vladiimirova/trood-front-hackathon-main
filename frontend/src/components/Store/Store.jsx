import { create } from 'zustand';

const useStore = create((set) => ({
  activeProjects: JSON.parse(localStorage.getItem('activeProjects')) || [
    { id: 1, name: 'Creating' },
    { id: 2, name: 'Analyzing' },
  ],
  completedProjects: JSON.parse(localStorage.getItem('completedProjects')) || [
    { id: 3, name: 'PassedComp' },
  ],

  setActiveProjects: (projects) => set(() => ({ activeProjects: projects })),

  setCompletedProjects: (projects) => set(() => ({ completedProjects: projects })),

  addProject: (project) => set((state) => {
    const newActiveProjects = [...state.activeProjects, project];
    localStorage.setItem('activeProjects', JSON.stringify(newActiveProjects)); 
    return { activeProjects: newActiveProjects };
  }),
  
  completeProject: (projectId) => set((state) => {
    const projectToComplete = state.activeProjects.find((p) => p.id === projectId);
    if (!projectToComplete) return state;

    const newActiveProjects = state.activeProjects.filter((p) => p.id !== projectId);
    const newCompletedProjects = [...state.completedProjects, projectToComplete];

    localStorage.setItem('activeProjects', JSON.stringify(newActiveProjects));
    localStorage.setItem('completedProjects', JSON.stringify(newCompletedProjects));

    return { activeProjects: newActiveProjects, completedProjects: newCompletedProjects };
  }),

  updateProject: (updatedProject) => set((state) => {
    const isActive = state.activeProjects.some(p => p.id === updatedProject.id);
    if (isActive) {
      const updatedActiveProjects = state.activeProjects.map(p =>
        p.id === updatedProject.id ? updatedProject : p
      );
      return { activeProjects: updatedActiveProjects };
    } else {
      const updatedCompletedProjects = state.completedProjects.map(p =>
        p.id === updatedProject.id ? updatedProject : p
      );
      return { completedProjects: updatedCompletedProjects };
    }
  }),
  removeProject: (projectId) => set((state) => {
    const updatedActiveProjects = state.activeProjects.filter(p => p.id !== projectId);
    const updatedCompletedProjects = state.completedProjects.filter(p => p.id !== projectId);
    return { activeProjects: updatedActiveProjects, completedProjects: updatedCompletedProjects };
  }),  
}));

export default useStore;
