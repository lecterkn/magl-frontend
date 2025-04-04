"use client";

import { useState } from "react";
import LoginDialog from "../login/login_dialog";
import { useAuthStore, useUserStore } from "@/store/user";
import { Configuration, UserApiFactory } from "@/api";
import { toast } from "sonner";
import AdministratorTab from "./topbar_admin_tab";
import { API_HOST_BASEPATH } from "@/api/global";
import { useRouter } from "next/navigation";

let title = "MyAnimeGameList";
// TODO: バックエンドから取得
let listSize = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const fetchUser = (
  accessToken: string | undefined,
  setUser: (user: UserModel | null) => void,
) => {
  if (!API_HOST_BASEPATH) {
    console.log("API_HOST_BASEPATH is not set");
    return;
  }
  if (!accessToken) {
    console.log("accessToken is not set");
    return;
  }
  const config = new Configuration({
    basePath: API_HOST_BASEPATH,
    apiKey: "Bearer " + accessToken,
  });
  UserApiFactory(config)
    .meGet()
    .then((response) => {
      setUser({
        id: response.data.id,
        name: response.data.name,
        role: response.data.role,
      });
    });
};

function Topbar() {
  const [isOpenLoginDialog, setOpenLoginDialog] = useState(false);
  const { auth, setAuth } = useAuthStore();
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const [stateUser, setStateUser] = useState<UserModel | null>(null);
  // ユーザー情報取得
  const updateUser = (userModel: UserModel | null) => {
    setUser(userModel);
    setStateUser(userModel);
  };
  if (!stateUser) {
    fetchUser(auth?.accessToken, updateUser);
  }
  const clickUser = () => {
    setAuth(null);
    updateUser(null);
    toast("signout");
  };
  return (
    <nav className="bg-blue-600 rounded-lg shadow-md p-4 mb-6 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <a
          className="text-2xl font-bold"
          href="#"
          onClick={() => {
            router.push("/");
          }}
        >
          {title}
        </a>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search AnimeGame..."
            className="bg-gray-100 px-3 py-2 rounded-md text-gray-800 w-full md:w-64"
          />
          <div className="flex space-x-2">
            <AdministratorTab role={user?.role} />
            <button
              className="px-4 py-2 rounded-md transition-colors bg-blue-500 hover:bg-blue-700"
              onClick={() => {
                router.push("/mypage");
              }}
            >
              My List ({listSize.length})
            </button>
            <button
              onClick={() => {
                if (user) {
                  clickUser();
                } else {
                  setOpenLoginDialog(true);
                }
              }}
              className="px-4 py-2 rounded-md transition-colors bg-blue-800 hover:bg-blue-900"
            >
              {user?.name ?? "Sign In"}
            </button>
          </div>
        </div>
      </div>
      <LoginDialog isOpen={isOpenLoginDialog} setOpen={setOpenLoginDialog} />
    </nav>
  );
}

export default Topbar;
