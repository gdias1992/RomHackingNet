import * as React from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/utils/cn";
import { Search, Check } from "lucide-react";

interface FilterOption {
  id: number;
  label: string;
}

interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selected: number[];
  onChange: (selected: number[]) => void;
  searchable?: boolean;
  maxHeight?: string;
  className?: string;
}

/**
 * Searchable checkbox list for metadata facets.
 */
export function FilterGroup({
  title,
  options,
  selected,
  onChange,
  searchable = true,
  maxHeight = "200px",
  className,
}: FilterGroupProps) {
  const [search, setSearch] = React.useState("");

  const filteredOptions = React.useMemo(() => {
    if (!search.trim()) return options;
    const lowerSearch = search.toLowerCase();
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(lowerSearch)
    );
  }, [options, search]);

  const handleToggle = (id: number) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      {searchable && options.length > 5 && (
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={`Search ${title.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 pl-8 text-xs"
          />
        </div>
      )}
      <ScrollArea className="pr-2" style={{ maxHeight }}>
        <div className="space-y-1">
          {filteredOptions.length === 0 ? (
            <p className="text-xs text-muted-foreground py-2">No matches</p>
          ) : (
            filteredOptions.map((option) => {
              const isSelected = selected.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleToggle(option.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isSelected && "bg-accent"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-sm border",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground"
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                  </div>
                  <span className="truncate flex-1 text-left">
                    {option.label}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </ScrollArea>
      {selected.length > 0 && (
        <button
          type="button"
          onClick={() => onChange([])}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Clear ({selected.length})
        </button>
      )}
    </div>
  );
}
