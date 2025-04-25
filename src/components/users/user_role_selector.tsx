import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

const roles = [
  { role: 0, name: "General" },
  { role: 1, name: "Moderator" },
  { role: 2, name: "Administrator" },
  { role: 3, name: "Root" },
];

interface RoleSelecterProps {
  myRole: number;
  currentRole: number;
  setValue: (value: number) => void;
}

export const RoleSelector: React.FC<RoleSelecterProps> = ({
  myRole,
  setValue,
  currentRole,
}) => {
  return (
    <Select
      onValueChange={(value) => {
        setValue(parseInt(value));
        console.log(parseInt(value));
      }}
      defaultValue={currentRole.toString()}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Score" />
      </SelectTrigger>
      <SelectContent>
        {roles
          .filter((item) => item.role < myRole)
          .map((item) => (
            <SelectItem key={item.name} value={item.role.toString()}>
              {item.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
