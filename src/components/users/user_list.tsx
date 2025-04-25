import { UserModel } from "@/model/user";
import React from "react";
import { UserCard } from "./user_card";

interface Props {
  myUser: UserModel;
  userList: UserModel[];
}

export const UserList: React.FC<Props> = ({ myUser, userList }) => {
  return (
    <div className="bg-white rounded-md overflow-hidden space-y-4">
      {userList.map((user) => (
        <UserCard key={user.id} user={user} editUserRole={myUser.role} />
      ))}
    </div>
  );
};
