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

interface Props {
  story: StoryModel;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addList: (id: string) => void;
}

const StoryAddDialog: React.FC<Props> = ({
  story,
  isOpen,
  setOpen,
  addList,
}) => {
  const [value, setValue] = useState<string | null>(null);
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
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              addList(story.id);
              toast('add "' + story.title + '" to list (' + value + ")");
              setOpen(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StoryAddDialog;
