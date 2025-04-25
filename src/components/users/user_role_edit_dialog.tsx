"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserModel } from "@/model/user";
import { useAuthStore, useUserStore } from "@/store/user";
import { useState } from "react";
import { Button } from "../ui/button";
import { RoleSelector } from "./user_role_selector";
import { toast } from "sonner";
import { API_HOST_BASEPATH } from "@/api/global";
import { Configuration, UserApiFactory } from "@/api";

interface Props {
  user: UserModel;
  editorRole: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const UserRoleEditDialog: React.FC<Props> = ({
  user,
  editorRole,
  isOpen,
  setOpen,
}) => {
  const auth = useAuthStore((state) => state.auth);
  const [value, setValue] = useState<number>(user.role);
  const onSubmit = () => {
    if (!auth) {
      toast("authorization error");
      return;
    }
    const config = new Configuration({
      basePath: API_HOST_BASEPATH,
      apiKey: "Bearer " + auth.accessToken,
    });
    UserApiFactory(config)
      .usersUserIdPermissionsPatch(user.id, {
        permission: value,
      })
      .then(() => {
        toast(user.name + "`s has been updated");
        setOpen(false);
      })
      .catch(() => {
        toast("failed to update role");
      });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="bg-gray-100 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{user.name}</DialogTitle>
          <DialogDescription>Role: {user.roleName}</DialogDescription>
        </DialogHeader>
        <RoleSelector
          myRole={editorRole}
          currentRole={user.role}
          setValue={setValue}
        />
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
