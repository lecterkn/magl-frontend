"use client";

import { useState } from "react";
import StarSelector from "../home/list/dialog/story_add_dialog_score_selector";
import { useAuthStore } from "@/store/user";
import { Configuration, MylistApiFactory } from "@/api";
import { API_HOST_BASEPATH } from "@/api/global";
import { toast } from "sonner";
import { StoryRemoveConfirmDialog } from "./mylist_story_remove_confirm_dialog";
import { MyListStoryModel } from "@/model/story";

interface Props {
  story: MyListStoryModel;
}

export const MyListStoryCard: React.FC<Props> = ({ story }) => {
  const auth = useAuthStore((state) => state.auth);
  const [score, setScore] = useState<number>(story.score);
  const [isRemoveDialogOpen, setRemoveDialogOpen] = useState(false);
  const updateScore = (score: number) => {
    const config = new Configuration({
      basePath: API_HOST_BASEPATH,
      apiKey: "Bearer " + auth?.accessToken,
    });
    MylistApiFactory(config)
      .mylistsPatch({
        storyId: story.id,
        score: score,
      })
      .then(() => {
        toast("updated score");
        story.score = score;
        setScore(score);
      })
      .catch(() => {
        toast("failed to update score");
      });
  };
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        {/* Image Placeholder */}
        <div className="col-span-1 flex justify-center sm:justify-start">
          <div className="bg-gray-200 border-2 border-dashed rounded-md w-12 h-16 flex-shrink-0" />
        </div>
        {/* Title */}
        <div className="col-span-12 sm:col-span-5 text-center sm:text-left">
          <p className="font-semibold text-gray-800">{story.title}</p>
          <p className="font-normal text-gray-500">{story.categoryName}</p>
        </div>
        {/* Score Select */}
        <div className="col-span-6 sm:col-span-2">
          <label htmlFor={`score-${story.id}`} className="sr-only">
            Score
          </label>
          <StarSelector setValue={updateScore} star={score} />
        </div>
        {/* Actions */}
        <div className="col-span-12 sm:col-span-1 flex justify-center sm:justify-end">
          <button
            onClick={() => {
              setRemoveDialogOpen(true);
            }}
            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100"
            aria-label={`Remove ${story.title}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <StoryRemoveConfirmDialog
        isOpen={isRemoveDialogOpen}
        setOpen={setRemoveDialogOpen}
        story={story}
      />
    </div>
  );
};
