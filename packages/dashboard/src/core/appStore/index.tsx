import { create } from "zustand";

interface AppStore {
  openedSideBar: boolean;
  setOpenedSideBar: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  openedSideBar: false,

  setOpenedSideBar: () => {
    const openedSideBar = get().openedSideBar;
    if (openedSideBar) {
      set({
        openedSideBar: false,
      });
    } else {
      set({
        openedSideBar: true,
      });
    }
  },
}));

export const setOpenedSideBarFct = () => {
  useAppStore.getState().setOpenedSideBar();
};
