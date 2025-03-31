"use client";

import { useState } from "react";
import StoryCard from "./story_card";
import { Configuration, StoryApiFactory } from "@/api";
import { API_HOST_BASEPATH } from "@/api/global";

export interface Story {
  id: number;
  title: string;
  category: string;
  score: number;
  imageUrl?: string;
  episodes: number;
}

export interface MyList {
  id: string;
}

export const userList: MyList[] = [
  {
    id: "2",
  },
  {
    id: "2",
  },
];

const fetchStories = (setStories: (stories: StoryModel[] | null) => void) => {
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

function StoryList() {
  const [stories, setStories] = useState<StoryModel[] | null>(null);
  if (!stories) {
    fetchStories(setStories);
  }
  return (
    <div className="container mx-auto">
      {stories && stories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <EmptyContent />
      )}
    </div>
  );
}

export function EmptyContent() {
  return (
    <div className="text-center text-gray-500 mt-10">No anime to display.</div>
  );
}

export default StoryList;
