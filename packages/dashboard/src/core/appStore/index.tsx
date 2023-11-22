import { create } from "zustand";

interface AppStore {
  opened_side_bar: boolean;
  setOpenedSideBar: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  opened_side_bar: false,

  setOpenedSideBar: () => {
    const opened_side_bar = get().opened_side_bar;
    if (opened_side_bar) {
      set({
        opened_side_bar: false,
      });
    } else {
      set({
        opened_side_bar: true,
      });
    }
  },
}));

export const setOpenedSideBarFct = () => {
  useAppStore.getState().setOpenedSideBar();
};
