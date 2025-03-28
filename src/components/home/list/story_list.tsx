import StoryCard from "./story_card";

export interface Story {
  id: number;
  title: string;
  category: string;
  score: number;
  imageUrl?: string;
  episodes: number;
}

export interface MyList {
  id: number;
}

export const userList: MyList[] = [
  {
    id: 2,
  },
  {
    id: 10,
  },
];

const storyList: Story[] = [
  {
    id: 1,
    title: "Episode 1", // 仮のエピソードタイトル
    category: "Frieren: Beyond Journey's End",
    score: 9.1,
    imageUrl:
      "https://media.discordapp.net/attachments/1353067774221488168/1353462814097932419/yo.jpg?ex=67e7acb9&is=67e65b39&hm=a2a354f61cff6e468b4c164edbdbfc217b37560af1fe3a0e62b5b8d191e01010&=&format=webp&width=1164&height=1280",
    episodes: 28,
  },
  {
    id: 2,
    title: "Final Episode", // 仮のエピソードタイトル
    category: "Attack on Titan",
    score: 8.8,
    episodes: 89,
  },
  {
    id: 3,
    title: "Shibuya Incident Arc", // 仮のエピソードタイトル
    category: "Jujutsu Kaisen",
    score: 8.7,
    episodes: 47,
  },
  {
    id: 4,
    title: "Luffy vs Kaido", // 仮のエピソードタイトル
    category: "One Piece",
    score: 8.5,
    episodes: 1100,
  },
  {
    id: 5,
    title: "Entertainment District Arc", // 仮のエピソードタイトル
    category: "Demon Slayer: Kimetsu no Yaiba",
    score: 8.6,
    episodes: 55,
  },
  {
    id: 6,
    title: "Thorfinn's Revenge", // 仮のエピソードタイトル
    category: "Vinland Saga",
    score: 8.9,
    episodes: 48,
  },
  {
    id: 7,
    title: "Denji's First Hunt", // 仮のエピソードタイトル
    category: "Chainsaw Man",
    score: 8.4,
    episodes: 12,
  },
  {
    id: 8,
    title: "Family Mission", // 仮のエピソードタイトル
    category: "Spy x Family",
    score: 8.7,
    episodes: 37,
  },
  {
    id: 9,
    title: "David vs Adam Smasher", // 仮のエピソードタイトル
    category: "Cyberpunk: Edgerunners",
    score: 8.6,
    episodes: 10,
  },
  {
    id: 10,
    title: "Ai's Secret", // 仮のエピソードタイトル
    category: "Oshi no Ko",
    score: 8.8,
    episodes: 11,
  },
  {
    id: 11,
    title: "First Awakening", // 仮のエピソードタイトル
    category: "Solo Leveling",
    score: 8.3,
    episodes: 12,
  },
  {
    id: 12,
    title: "Upcoming Premiere", // 仮のエピソードタイトル
    category: "Dandadan",
    score: 0,
    episodes: 0,
  },
];

function StoryList() {
  return (
    <div className="container mx-auto">
      {storyList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {storyList.map((story) => (
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
