import { UserModel } from "@/model/user";
import { useState } from "react";
import { UserRoleEditDialog } from "./user_role_edit_dialog";

interface Props {
  user: UserModel;
  editUserRole: number;
}

export const UserCard: React.FC<Props> = ({ user, editUserRole }) => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  return (
    <>
      <UserRoleEditDialog
        user={user}
        editorRole={editUserRole}
        isOpen={isEditDialogOpen}
        setOpen={setEditDialogOpen}
      />
      <div className="bg-gray-100 rounded-lg shadow-md p-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">Role: {user.roleName}</p>
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
    </>
  );
};
