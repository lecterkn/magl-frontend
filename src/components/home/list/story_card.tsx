"use client";

import StoryAddDialog from "./dialog/story_add_dialog";
import { MyList, userList } from "./story_list";
import { useState } from "react";

interface Props {
  story: StoryModel;
}

const StoryCard: React.FC<Props> = ({ story }) => {
  const [myList, setMyList] = useState<MyList[]>(userList);
  const [isOpenAddDialog, setOpenAddDialog] = useState(false);

  const addToMyList = (id: string) => {
    setMyList([
      ...myList,
      {
        id: id,
      },
    ]);
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="w-full h-48 bg-gray-200 border-b border-gray-300 flex items-center justify-center object-fill">
        {story.imageUrl ? (
          <img
            className="w-full h-full object-cover"
            src={story.imageUrl.toString()}
          />
        ) : (
          <div className="bg-gray-300 border-2 border-dashed border-gray-400 rounded-xl w-16 h-16 flex items-center justify-center text-gray-500 text-sm">
            Img
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold mb-1 truncate" title={story.title}>
          {story.title}
        </h2>
        <h2 className="text-md font-semibold mb-1 truncate text-gray-600">
          {story.categoryName}
        </h2>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="text-yellow-500 mr-1">&#9733;</span>{" "}
          {/* Star icon */}
          <span>{story.score > 0 ? story.score.toFixed(1) : "N/A"}</span>
        </div>
        <div className="mt-auto">
          <button
            onClick={() => {
              setOpenAddDialog(true);
            }}
            disabled={myList.some((item) => item.id === story.id)}
            className={`w-full px-3 py-1.5 text-sm rounded-md text-white transition-colors ${
              myList.some((item) => item.id === story.id)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
          >
            {myList.some((item) => item.id === story.id)
              ? "In List"
              : "Add to List"}
          </button>
        </div>
      </div>
      <StoryAddDialog
        story={story}
        isOpen={isOpenAddDialog}
        setOpen={setOpenAddDialog}
        addList={addToMyList}
      />
    </div>
  );
};

export default StoryCard;
