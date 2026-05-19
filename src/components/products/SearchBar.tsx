import { memo } from "react";
import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = memo(({ value, onChange }: Props) => {
  return (
    <div className="flex flex-1 max-w-md items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
      <Search size={14} className="text-gray-400" />
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent text-sm outline-none"
      />
    </div>
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;
