import { UserModel } from "@/model/user";
import { useState } from "react";
import { UserRoleEditDialog } from "./user_role_edit_dialog";

interface Props {
  user: UserModel;
  editUserRole: number;
}

const getRoleColor = (role: number) => {
  if (role === 0) {
    return "bg-blue-500";
  }
  if (role === 1) {
    return "bg-green-500";
  }
  return "bg-red-500";
};

export const UserCard: React.FC<Props> = ({ user, editUserRole }) => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold">{user.name}</span>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)} text-white`}
            >
              {user.roleName}
            </span>
          </div>
          <p className="text-gray-600 text-md">{user.email}</p>
        </div>
        <div>
          {user.role < editUserRole ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                setEditDialogOpen(true);
              }}
            >
              Edit
            </button>
          ) : (
            <button
              className="bg-gray-300 text-gray-500 font-bold py-2 px-6 rounded cursor-not-allowed"
              disabled
            >
              Edit
            </button>
          )}
        </div>
      </div>
      <UserRoleEditDialog
        user={user}
        editorRole={editUserRole}
        isOpen={isEditDialogOpen}
        setOpen={setEditDialogOpen}
      />
    </>
  );
};
