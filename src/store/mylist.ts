import { MyListStoryModel } from "@/model/story";
import { create } from "zustand";
import { useAuthStore } from "./user";
import { Configuration, MylistApiFactory } from "@/api";
import { API_HOST_BASEPATH } from "@/api/global";

interface MyListState {
  myList: MyListStoryModel[];
  setMyList: (mylist: MyListStoryModel[]) => void;
  fetchMyList: () => void;
}

export const useMyListStore = create<MyListState>((set) => ({
  myList: [],
  setMyList: (myList) => set({ myList }),
  fetchMyList: () => {
    const auth = useAuthStore.getState().auth;
    if (!auth) {
      return;
    }
    const config = new Configuration({
      basePath: API_HOST_BASEPATH,
      apiKey: "Bearer " + auth.accessToken,
    });
    MylistApiFactory(config)
      .mylistsGet()
      .then((response) => {
        const storyList: MyListStoryModel[] = [];
        response.data.list.map((item) => {
          storyList.push({
            id: item.id,
            title: item.title,
            episode: item.episode,
            description: item.description,
            imageUrl: item.imageUrl,
            categoryId: item.categoryId,
            categoryName: item.categoryName,
            score: item.score,
          });
        });
        set({ myList: storyList });
      });
  },
}));
