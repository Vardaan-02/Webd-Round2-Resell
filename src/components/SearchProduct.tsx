import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEffectAfterMount from "@/hooks/useEffectAfterMount";
import { useDebounce } from "@/hooks/useDebounce";
import { tags } from "@/lib/tags";
import { useDispatch } from "react-redux";
import { setCategory } from "@/state/category/categorySlice";
import { setTab } from "@/state/tab/tabSlice";

export default function SearchProduct() {
  const [isActive, setIsActive] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState(tags);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const debouncedSearch = useDebounce(search, 1000);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffectAfterMount(() => {
    setSuggestions(
      tags.filter((suggestion) =>
        suggestion.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    );
  }, [debouncedSearch]);

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    navigate(`/product/${suggestions[selectedCategory]}`);
    dispatch(setCategory(selectedCategory));
    dispatch(setTab("product"));
    setIsActive(false);
    setSearch("");
  }

  function handleSearch2(s: string) {
    navigate(`/product/${s}`);
    dispatch(setCategory(s));
    dispatch(setTab("product"));
    setIsActive(false);
    setSearch("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown" && selectedCategory < suggestions.length - 1)
      setSelectedCategory((state) => state + 1);
    if (e.key === "ArrowUp" && selectedCategory > 0)
      setSelectedCategory((state) =>
        state < suggestions.length ? state - 1 : state
      );
  }

  return (
    <div className="relative flex">
      <Input
        type="search"
        placeholder="Search..."
        value={search}
        className="pl-10 pr-4 w-64"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          handleSearch(e);
          handleKeyDown(e);
        }}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={18}
      />
      {isActive && (
        <ul className="absolute z-10 bg-white dark:bg-zinc-900 border border-gray-300 w-64 mt-12 max-h-96 rounded shadow-lg overflow-scroll no-scrollbar">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-800 cursor-pointer ${
                suggestions[selectedCategory] === suggestion &&
                "bg-zinc-300 dark:bg-zinc-800"
              }`}
              onMouseDown={() => {
                setSearch(suggestion);
                setIsActive(false);
                handleSearch2(suggestion);
              }}
              onMouseOver={() => {
                setSelectedCategory(index);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
