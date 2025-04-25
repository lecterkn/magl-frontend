"use client";

import { UserCard } from "@/components/users/user_card";
import { UserList } from "@/components/users/user_list";
import { useAuthStore, useUserStore } from "@/store/user";
import { useUserListStore } from "@/store/users";
import { useEffect } from "react";

const Users = () => {
  const auth = useAuthStore((state) => state.auth);
  const user = useUserStore((state) => state.user);
  const userList = useUserListStore((state) => state.userList);
  const fetchUsers = useUserListStore((state) => state.fetchUsers);
  useEffect(() => {
    fetchUsers();
  }, [auth]);
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
        Manage Users
      </h2>
      {user ? (
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold mb-2">Your Profile</h1>
          <div className="bg-gray-100 rounded-lg p-4">
            <UserCard user={user} editUserRole={0} />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Other Users</h1>
          <div className="bg-gray-100 rounded-lg p-4">
            <UserList
              myUser={user}
              userList={userList.filter((item) => item.id !== user.id)}
            />
          </div>
        </div>
      ) : (
        <h1 className="text-xl">something went wrong</h1>
      )}
    </div>
  );
};

export default Users;
