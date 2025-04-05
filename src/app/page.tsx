"use client";
import { Configuration, StoryApiFactory } from "@/api";
import { API_HOST_BASEPATH } from "@/api/global";
import StoryList from "@/components/home/list/story_list";
import { useEffect, useState } from "react";

const fetchStories = (setStories: (stories: StoryModel[]) => void) => {
  const config = new Configuration({
    basePath: API_HOST_BASEPATH,
  });
  StoryApiFactory(config)
    .storiesGet()
    .then((response) => {
      const storyList: StoryModel[] = [];
      response.data.list.map((item) => {
        storyList.push({
          id: item.id,
          categoryId: item.categoryId,
          categoryName: item.categoryName,
          title: item.title,
          episode: item.episode,
          description: item.description,
          score: 5,
          imageUrl: item.imageUrl,
        });
        setStories(storyList);
      });
    })
    .catch(() => {
      setStories([]);
    });
};
function Home() {
  const [stories, setStories] = useState<StoryModel[]>([]);
  useEffect(() => {
    fetchStories(setStories);
  }, []);
  return <StoryList stories={stories} />;
}

export default Home;
