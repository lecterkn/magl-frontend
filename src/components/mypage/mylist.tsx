"use client";

import { MyListStoryCard } from "./mylist_story_card";

interface Props {
  stories: MyListStoryModel[];
}

export const MyList: React.FC<Props> = ({ stories }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My List</h2>
      {/* List Header */}
      <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-2 bg-gray-50 rounded-t-md text-left text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
        <div className="col-span-1"></div> {/* Image Col */}
        <div className="col-span-5">Title</div>
        <div className="col-span-2">Score</div>
        <div className="col-span-1"></div> {/* Actions Col */}
      </div>
      <ul className="space-y-3">
        {stories.length > 0 ? (
          stories.map((story) => (
            <li
              key={story.id}
              className="bg-white border border-gray-200 rounded-md p-4"
            >
              <MyListStoryCard story={story} />
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500 py-4">No items found.</li>
        )}
      </ul>
    </div>
  );
};
