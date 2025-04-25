"use client";

import { useEffect, useState } from "react";
import LoginDialog from "../login/login_dialog";
import { useAuthStore, useUserStore } from "@/store/user";
import { Configuration, MylistApiFactory, UserApiFactory } from "@/api";
import { toast } from "sonner";
import AdministratorTab from "./topbar_admin_tab";
import { API_HOST_BASEPATH } from "@/api/global";
import { useRouter } from "next/navigation";
import { useMyListStore } from "@/store/mylist";
import { UserDropdownButton } from "./topbar_user_dropdown_button";
import { AuthModel, UserModel } from "@/model/user";
import { MyListStoryModel } from "@/model/story";

const title = "MyAnimeGameList";

const fetchUser = (
  accessToken: string,
  setUser: (user: UserModel | null) => void,
  setAuth: (user: AuthModel | null) => void,
  setMyList: (user: MyListStoryModel[]) => void,
) => {
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
        roleName: response.data.roleName,
      });
    })
    .catch((e) => {
      if (e.status === 401) {
        setMyList([]);
        setAuth(null);
      }
    });
};

const fetchMyList = (
  accessToken: string,
  setMyList: (myList: MyListStoryModel[]) => void,
) => {
  const config = new Configuration({
    basePath: API_HOST_BASEPATH,
    apiKey: "Bearer " + accessToken,
  });
  MylistApiFactory(config)
    .mylistsGet()
    .then((response) => {
      const storyList: MyListStoryModel[] = [];
      response.data.list.map((item) => {
        storyList.push({
          id: item.id,
          title: item.title,
          episode: item.episode,
          description: item.description,
          imageUrl: item.imageUrl,
          categoryId: item.categoryId,
          categoryName: item.categoryName,
          score: item.score,
        });
      });
      setMyList(storyList);
    })
    .catch(() => {
      toast("failed to load MyList");
    });
};

function Topbar() {
  const [isOpenLoginDialog, setOpenLoginDialog] = useState(false);
  const auth = useAuthStore((state) => state.auth);
  const setAuth = useAuthStore((state) => state.setAuth);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const myList = useMyListStore((state) => state.myList);
  const setMyList = useMyListStore((state) => state.setMyList);
  const router = useRouter();
  useEffect(() => {
    if (!auth) {
      return;
    }
    fetchUser(auth.accessToken, setUser, setAuth, setMyList);
    fetchMyList(auth.accessToken, setMyList);
  }, [auth]);
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
          {auth && user ? (
            <div className="flex space-x-2">
              <AdministratorTab role={user?.role} />
              <button
                className="px-4 py-2 rounded-md transition-colors bg-blue-500 hover:bg-blue-700"
                onClick={() => {
                  router.push("/mypage");
                }}
              >
                My List ({myList.length})
              </button>
              <UserDropdownButton title={user.name} />
            </div>
          ) : (
            <button
              onClick={() => {
                setOpenLoginDialog(true);
              }}
              className="px-4 py-2 rounded-md transition-colors bg-blue-800 hover:bg-blue-900"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      <LoginDialog isOpen={isOpenLoginDialog} setOpen={setOpenLoginDialog} />
    </nav>
  );
}

export default Topbar;
