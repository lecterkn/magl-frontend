"use client";

import { MyList } from "@/components/mypage/mylist";
import { useMyListStore } from "@/store/mylist";
import { useAuthStore } from "@/store/user";
import { useEffect } from "react";

function MyPage() {
  const auth = useAuthStore((state) => state.auth);
  const myList = useMyListStore((state) => state.myList);
  const setMyList = useMyListStore((state) => state.setMyList);
  const fetchMyList = useMyListStore((state) => state.fetchMyList);
  useEffect(() => {
    fetchMyList();
  }, [auth, setMyList]);
  return <MyList stories={myList} />;
}

export default MyPage;
