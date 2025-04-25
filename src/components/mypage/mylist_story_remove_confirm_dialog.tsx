import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/user";
import { Configuration, MylistApiFactory } from "@/api";
import { API_HOST_BASEPATH } from "@/api/global";
import { useMyListStore } from "@/store/mylist";
import { MyListStoryModel } from "@/model/story";

interface Props {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  story: MyListStoryModel;
}

export const StoryRemoveConfirmDialog: React.FC<Props> = ({
  isOpen,
  setOpen,
  story,
}) => {
  const auth = useAuthStore((state) => state.auth);
  const myList = useMyListStore((state) => state.myList);
  const fetchMyList = useMyListStore((state) => state.fetchMyList);
  const onSubmit = () => {
    if (!auth) {
      toast("authorization error");
      return;
    }
    const config = new Configuration({
      basePath: API_HOST_BASEPATH,
      apiKey: "Bearer " + auth.accessToken,
    });
    MylistApiFactory(config)
      .mylistsStoryIdDelete(story.id)
      .then(() => {
        toast(story.title + " has been removed");
        fetchMyList();
        setOpen(false);
      })
      .catch(() => {
        toast("failed to remove from MyList");
        setOpen(false);
      });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="bg-gray-100 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{story.title}</DialogTitle>
          <DialogDescription>{story.categoryName}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-gray-500 hover:bg-gray-600"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button className="bg-red-600 hover:bg-red-700" onClick={onSubmit}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
