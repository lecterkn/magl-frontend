import { create } from "zustand";

interface MyListState {
  myList: StoryModel[];
  setMyList: (mylist: StoryModel[]) => void;
}

export const useMyListStore = create<MyListState>((set) => ({
  myList: [],
  setMyList: (myList) => set({ myList }),
}));
