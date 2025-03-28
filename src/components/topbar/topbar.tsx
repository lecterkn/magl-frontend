"use client";

import { useState } from "react";
import LoginDialog from "../login/login_dialog";
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
// TODO: ローカルデータから取得
let user: string | null = null;

function Topbar() {
  const [isOpenLoginDialog, setOpenLoginDialog] = useState(false);
  const router = useRouter();
  return (
    <nav className="bg-blue-600 rounded-lg shadow-md p-4 mb-6 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search AnimeGame..."
            className="bg-gray-100 px-3 py-2 rounded-md text-gray-800 w-full md:w-64"
          />
          <div className="flex space-x-2">
            <button className="px-4 py-2 rounded-md transition-colors bg-blue-500 hover:bg-blue-700">
              My List ({listSize.length})
            </button>
            <button
              onClick={() => {
                if (user) {
                  router.push("/mypage");
                } else {
                  setOpenLoginDialog(true);
                }
              }}
              className="px-4 py-2 rounded-md transition-colors bg-blue-800 hover:bg-blue-900"
            >
              {user ?? "Sign In"}
            </button>
          </div>
        </div>
      </div>
      <LoginDialog isOpen={isOpenLoginDialog} setOpen={setOpenLoginDialog} />
    </nav>
  );
}

export default Topbar;
