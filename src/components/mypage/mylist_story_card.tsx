import { useState } from "react";
import StarSelector from "../home/list/dialog/story_add_dialog_score_selector";
import { useAuthStore } from "@/store/user";
import { Configuration, MylistApiFactory } from "@/api";
import { API_HOST_BASEPATH } from "@/api/global";
import { toast } from "sonner";

interface Props {
  story: MyListStoryModel;
}

export const MyListStoryCard: React.FC<Props> = ({ story }) => {
  const { auth } = useAuthStore();
  const [score, setScore] = useState<number>(story.score);
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
    </div>
  );
};
