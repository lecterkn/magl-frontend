"use client";
import { Configuration, MylistApiFactory } from "@/api";
import { API_HOST_BASEPATH } from "@/api/global";
import { MyList } from "@/components/mypage/mylist";
import { MyListStoryModel } from "@/model/story";
import { useMyListStore } from "@/store/mylist";
import { useAuthStore } from "@/store/user";
import { useEffect } from "react";

function MyPage() {
  const myList = useMyListStore((state) => state.myList);
  const setMyList = useMyListStore((state) => state.setMyList);
  const auth = useAuthStore((state) => state.auth);
  useEffect(() => {
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
        setMyList(storyList);
      });
  }, [auth, setMyList]);
  return <MyList stories={myList} />;
}

export default MyPage;
