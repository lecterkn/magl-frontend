import { StoryModel } from "@/model/story";
import StoryCard from "./story_card";

interface Props {
  stories: StoryModel[];
}

const StoryList: React.FC<Props> = ({ stories }) => {
  return (
    <div className="container mx-auto">
      {stories.length > 0 ? (
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
};

export function EmptyContent() {
  return (
    <div className="text-center text-gray-500 mt-10">No anime to display.</div>
  );
}

export default StoryList;
