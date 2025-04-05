import { create } from "zustand";

interface MyListState {
  myList: MyListStoryModel[];
  setMyList: (mylist: MyListStoryModel[]) => void;
}

export const useMyListStore = create<MyListState>((set) => ({
  myList: [],
  setMyList: (myList) => set({ myList }),
}));
