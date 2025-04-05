interface StoryModel {
  id: string;
  categoryId: string;
  categoryName: string;
  title: string;
  episode: string;
  description: string;
  score: number | null;
  imageUrl: string | null;
}

interface MyListStoryModel {
  id: string;
  categoryId: string;
  categoryName: string;
  title: string;
  episode: string;
  description: string;
  score: number;
  imageUrl: string | null;
}
