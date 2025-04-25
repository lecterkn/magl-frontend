"use client";

import { Configuration, UserApiFactory } from "@/api";
import { API_HOST_BASEPATH } from "@/api/global";
import { UserCard } from "@/components/users/user_card";
import { UserList } from "@/components/users/user_list";
import { UserModel } from "@/model/user";
import { useAuthStore, useUserStore } from "@/store/user";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

const userListExample: UserModel[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    roleName: "administrator",
    role: 2,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    roleName: "administrator",
    role: 2,
  },
  {
    id: "3",
    name: "Peter Jones",
    email: "peter.jones@example.com",
    roleName: "moderator",
    role: 1,
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    roleName: "viewer",
    role: 0,
  },
  {
    id: "5",
    name: "Bob Williams",
    email: "bob.williams@example.com",
    roleName: "viewer",
    role: 0,
  },
];

const Users = () => {
  const auth = useAuthStore((state) => state.auth);
  const user = useUserStore((state) => state.user);
  const [userList, setUserList] = useState<UserModel[]>([]);
  useEffect(() => {
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
        setUserList(users);
      });
  }, [auth]);
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Users</h2>
      {user ? (
        <div className="space-y-4">
          <h1 className="text-xl font-semibold mb-2">Your Profile</h1>
          <UserCard user={user} canEdit={false} />
          <h1 className="text-xl font-semibold mb-2">Other Users</h1>
          <UserList
            myUser={user}
            userList={userList.filter((item) => item.id !== user.id)}
          />
        </div>
      ) : (
        <h1 className="text-xl">something went wrong</h1>
      )}
    </div>
  );
};

export default Users;
