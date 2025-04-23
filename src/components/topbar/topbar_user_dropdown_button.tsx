import { LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuthStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { useMyListStore } from "@/store/mylist";

interface Props {
  title: string;
}
export const UserDropdownButton: React.FC<Props> = ({ title }) => {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { setMyList } = useMyListStore();
  const onSignout = () => {
    setAuth(null);
    setMyList([]);
    router.push("/");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="px-4 py-2 rounded-md transition-colors bg-blue-800 hover:bg-blue-900">
          My Account
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignout}>
          <LogOut />
          Signout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
