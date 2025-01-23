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
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const projectDeadline = new Date(project.deadline);

    let newActiveProjects = [...state.activeProjects];
    let newCompletedProjects = [...state.completedProjects];
    
    if (projectDeadline <= today) {  
      newCompletedProjects = [...newCompletedProjects, project];
    } else {
      newActiveProjects = [...newActiveProjects, project];
    }
  
    localStorage.setItem('activeProjects', JSON.stringify(newActiveProjects));
    localStorage.setItem('completedProjects', JSON.stringify(newCompletedProjects));
    
    return { 
      activeProjects: newActiveProjects, 
      completedProjects: newCompletedProjects 
    };
  }),
  

  completeProject: (projectId) => set((state) => {
    const projectToComplete = state.activeProjects.find((p) => p.id === projectId);
    if (!projectToComplete) return state;

    const today = new Date();
    today.setDate(today.getDate() - 1); 
    const projectDeadline = new Date(projectToComplete.deadline);

    if (projectDeadline <= today) {  
      const newCompletedProjects = [...state.completedProjects, projectToComplete];
      const newActiveProjects = state.activeProjects.filter((p) => p.id !== projectId);

      localStorage.setItem('activeProjects', JSON.stringify(newActiveProjects));
      localStorage.setItem('completedProjects', JSON.stringify(newCompletedProjects));

      return { activeProjects: newActiveProjects, completedProjects: newCompletedProjects };
    }

    return state; 
  }),

  updateProject: (updatedProject) => set((state) => {
    const today = new Date();
    today.setDate(today.getDate() - 1); 
    const projectDeadline = new Date(updatedProject.deadline);
    const isActive = state.activeProjects.some(p => p.id === updatedProject.id);

    if (isActive) {
      if (projectDeadline <= today) {  
        const updatedActiveProjects = state.activeProjects.filter(p => p.id !== updatedProject.id);
        const updatedCompletedProjects = [...state.completedProjects, updatedProject];
        localStorage.setItem('activeProjects', JSON.stringify(updatedActiveProjects));
        localStorage.setItem('completedProjects', JSON.stringify(updatedCompletedProjects));
        return { activeProjects: updatedActiveProjects, completedProjects: updatedCompletedProjects };
      }

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
