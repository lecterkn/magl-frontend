import StoryList from "@/components/home/list/story_list";
import Topbar from "@/components/home/topbar/topbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <Topbar />
      <StoryList />
    </div>
  );
}
