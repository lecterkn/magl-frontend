import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stars = [
  { value: 1, description: "Very Bad" },
  { value: 2, description: "Bad" },
  { value: 3, description: "Poor" },
  { value: 4, description: "Below Average" },
  { value: 5, description: "Average" },
  { value: 6, description: "Fair" },
  { value: 7, description: "Good" },
  { value: 8, description: "Very Good" },
  { value: 9, description: "Excellent" },
  { value: 10, description: "Outstanding" },
];

interface StarSelecterProps {
  setValue: (value: number | null) => void;
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
          <SelectItem key={star.value} value={star.value}>
            {star.value} ({star.description})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StarSelector;
