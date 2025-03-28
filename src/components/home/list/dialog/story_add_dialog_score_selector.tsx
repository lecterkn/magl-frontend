import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stars = [
  { name: "1", description: "Very Bad" },
  { name: "2", description: "Bad" },
  { name: "3", description: "Poor" },
  { name: "4", description: "Below Average" },
  { name: "5", description: "Average" },
  { name: "6", description: "Fair" },
  { name: "7", description: "Good" },
  { name: "8", description: "Very Good" },
  { name: "9", description: "Excellent" },
  { name: "10", description: "Outstanding" },
];

interface StarSelecterProps {
  setValue: (value: string | null) => void;
}

const StarSelector: React.FC<StarSelecterProps> = ({ setValue }) => {
  return (
    <Select
      onValueChange={(value) => {
        setValue(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Score" />
      </SelectTrigger>
      <SelectContent>
        {stars.map((star) => (
          <SelectItem key={star.name} value={star.name}>
            {star.name} ({star.description})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StarSelector;
