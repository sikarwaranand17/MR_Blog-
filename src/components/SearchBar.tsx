
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { FormEvent, useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const SearchBar = ({ onSearch, initialQuery = '' }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl gap-2">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchBar;
