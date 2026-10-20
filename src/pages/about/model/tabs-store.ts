import { create } from "zustand/react";

import type { AboutType } from "../config";

import { closeTab, openTab } from "./tabs";

interface ITabsStore {
  tabs: AboutType[];
  open: (type: AboutType) => void;
  /** Closes a tab and returns the one to show instead (none left → undefined). */
  close: (type: AboutType) => AboutType | undefined;
}

// Kept in memory only: a reload starts again with the page's own file.
export const useTabsStore = create<ITabsStore>()((set, get) => ({
  tabs: [],
  open: type => set(state => ({ tabs: openTab(state.tabs, type) })),
  close: type => {
    const { tabs, next } = closeTab(get().tabs, type);
    set({ tabs });
    return next;
  }
}));

export const selectTabs = (s: ITabsStore) => s.tabs;
export const selectOpen = (s: ITabsStore) => s.open;
export const selectClose = (s: ITabsStore) => s.close;
