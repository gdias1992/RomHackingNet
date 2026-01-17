import * as React from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";
import { Search, Gamepad2, Wrench, Languages, Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { useGames } from "@/hooks/useGames";
import { useHacks } from "@/hooks/useHacks";
import { useTranslations } from "@/hooks/useTranslations";
import { useDebounce } from "@/hooks/useDebounce";

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Command-palette style overlay for quick navigation.
 */
export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 300);

  // Fetch results when search changes
  const { data: gamesData, isLoading: gamesLoading } = useGames(
    { q: debouncedSearch, page_size: 5 },
    { enabled: debouncedSearch.length >= 2 }
  );
  const { data: hacksData, isLoading: hacksLoading } = useHacks(
    { q: debouncedSearch, page_size: 5 },
    { enabled: debouncedSearch.length >= 2 }
  );
  const { data: translationsData, isLoading: translationsLoading } =
    useTranslations(
      { q: debouncedSearch, page_size: 5 },
      { enabled: debouncedSearch.length >= 2 }
    );

  const isLoading = gamesLoading || hacksLoading || translationsLoading;
  const hasResults =
    (gamesData?.items?.length || 0) > 0 ||
    (hacksData?.items?.length || 0) > 0 ||
    (translationsData?.items?.length || 0) > 0;

  const handleSelect = (path: string) => {
    navigate(path);
    onOpenChange(false);
    setSearch("");
  };

  // Keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className="absolute left-1/2 top-[15%] w-full max-w-lg -translate-x-1/2 px-4">
        <Command
          className="rounded-lg border bg-popover shadow-lg"
          shouldFilter={false}
        >
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search games, hacks, translations..."
              className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            {isLoading && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2">
            {search.length < 2 ? (
              <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                Type at least 2 characters to search...
              </Command.Empty>
            ) : !hasResults && !isLoading ? (
              <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                No results found for "{search}"
              </Command.Empty>
            ) : (
              <>
                {/* Games */}
                {gamesData?.items && gamesData.items.length > 0 && (
                  <Command.Group heading="Games">
                    {gamesData.items.map((game) => (
                      <Command.Item
                        key={`game-${game.gamekey}`}
                        value={`game-${game.gamekey}`}
                        onSelect={() => handleSelect(`/games/${game.gamekey}`)}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer",
                          "aria-selected:bg-accent aria-selected:text-accent-foreground"
                        )}
                      >
                        <Gamepad2 className="h-4 w-4 text-muted-foreground" />
                        <span className="flex-1 truncate">{game.gametitle}</span>
                        {game.platform_name && (
                          <span className="text-xs text-muted-foreground">
                            {game.platform_name}
                          </span>
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                {/* Hacks */}
                {hacksData?.items && hacksData.items.length > 0 && (
                  <Command.Group heading="ROM Hacks">
                    {hacksData.items.map((hack) => (
                      <Command.Item
                        key={`hack-${hack.hackkey}`}
                        value={`hack-${hack.hackkey}`}
                        onSelect={() => handleSelect(`/hacks/${hack.hackkey}`)}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer",
                          "aria-selected:bg-accent aria-selected:text-accent-foreground"
                        )}
                      >
                        <Wrench className="h-4 w-4 text-muted-foreground" />
                        <span className="flex-1 truncate">{hack.hacktitle}</span>
                        {hack.console_name && (
                          <span className="text-xs text-muted-foreground">
                            {hack.console_name}
                          </span>
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                {/* Translations */}
                {translationsData?.items && translationsData.items.length > 0 && (
                  <Command.Group heading="Translations">
                    {translationsData.items.map((trans) => (
                      <Command.Item
                        key={`trans-${trans.transkey}`}
                        value={`trans-${trans.transkey}`}
                        onSelect={() =>
                          handleSelect(`/translations/${trans.transkey}`)
                        }
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer",
                          "aria-selected:bg-accent aria-selected:text-accent-foreground"
                        )}
                      >
                        <Languages className="h-4 w-4 text-muted-foreground" />
                        <span className="flex-1 truncate">
                          {trans.game_title || "Unknown Game"}
                        </span>
                        {trans.language_name && (
                          <span className="text-xs text-muted-foreground">
                            {trans.language_name}
                          </span>
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}
              </>
            )}
          </Command.List>

          <div className="border-t px-3 py-2 text-xs text-muted-foreground">
            <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">↑↓</kbd>{" "}
            navigate{" "}
            <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">↵</kbd>{" "}
            select{" "}
            <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">esc</kbd>{" "}
            close
          </div>
        </Command>
      </div>
    </div>
  );
}
