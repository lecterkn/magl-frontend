"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import StarSelector from "./story_add_dialog_score_selector";
import { Configuration, MylistApiFactory } from "@/api";
import { API_HOST_BASEPATH } from "@/api/global";
import { useAuthStore } from "@/store/user";
import { useMyListStore } from "@/store/mylist";
import { StoryModel } from "@/model/story";

interface Props {
  story: StoryModel;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const StoryAddDialog: React.FC<Props> = ({ story, isOpen, setOpen }) => {
  const fetchMyList = useMyListStore((state) => state.fetchMyList);
  const auth = useAuthStore((state) => state.auth);
  const [value, setValue] = useState<number | null>(null);
  const onSubmit = () => {
    if (!value) {
      toast("score is not set!");
      return;
    }
    if (!auth) {
      toast("authorization error");
      return;
    }
    const config = new Configuration({
      basePath: API_HOST_BASEPATH,
      apiKey: "Bearer " + auth.accessToken,
    });
    MylistApiFactory(config)
      .mylistsPost({
        storyId: story.id,
        score: value,
      })
      .then(() => {
        fetchMyList();
        setOpen(false);
      })
      .catch(() => {
        toast("failed to add to MyList");
      });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="bg-gray-100 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{story.title}</DialogTitle>
          <DialogDescription>{story.categoryName}</DialogDescription>
        </DialogHeader>
        <StarSelector setValue={setValue} />
        <DialogFooter>
          <Button
            className="bg-gray-500 hover:bg-gray-600"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={onSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StoryAddDialog;
