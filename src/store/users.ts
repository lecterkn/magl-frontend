import { UserModel } from "@/model/user";
import { create } from "zustand";
import { useAuthStore } from "./user";
import { Configuration, UserApiFactory } from "@/api";
import { API_HOST_BASEPATH } from "@/api/global";

interface UserListState {
  userList: UserModel[];
  setUserList: (users: UserModel[]) => void;
  fetchUsers: () => void;
}

export const useUserListStore = create<UserListState>((set) => ({
  userList: [],
  setUserList: (users: UserModel[]) => set({ userList: users }),
  fetchUsers: () => {
    const auth = useAuthStore.getState().auth;
    if (!auth) {
      return;
    }
    const config = new Configuration({
      basePath: API_HOST_BASEPATH,
      apiKey: "Bearer " + auth.accessToken,
    });
    UserApiFactory(config)
      .usersGet()
      .then((response) => {
        const users: UserModel[] = [];
        response.data.list.map((user) => {
          users.push({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            roleName: user.roleName,
          });
        });
        set({ userList: users });
      });
  },
}));
