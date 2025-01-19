import { create } from 'zustand';

const useStore = create(function (set) {
  return {
    project: null, 
    setProject: function (newProject) {
      set({ project: newProject });
    },
    updateProject: function (updatedFields) {
      set(function (state) {
        return { project: { ...state.project, ...updatedFields } };
      });
    },
  };
});

export default useStore;
