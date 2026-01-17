import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGames, useMetadata } from "@/hooks";
import { DataTable } from "@/components/shared/DataTable";
import { FilterGroup } from "@/components/shared/FilterGroup";
import { Pagination } from "@/components/shared/Pagination";
import { EmptyState } from "@/components/shared/EmptyState";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type ColumnDef } from "@tanstack/react-table";
import type { GameListItem } from "@/api/types";
import { Search, X, Wrench, Languages, Filter } from "lucide-react";
import { cn } from "@/utils/cn";
import { useDebounce } from "@/hooks/useDebounce";

const PAGE_SIZE = 50;

/**
 * Game Explorer page with filters and data table.
 */
export function GamesPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterSidebarOpen, setFilterSidebarOpen] = React.useState(false);

  // Parse URL params
  const searchQuery = searchParams.get("q") || "";
  const platformFilter = searchParams.get("platform")
    ? parseInt(searchParams.get("platform")!, 10)
    : undefined;
  const genreFilter = searchParams.get("genre")
    ? parseInt(searchParams.get("genre")!, 10)
    : undefined;
  const hasHacksFilter = searchParams.get("has_hacks") === "true";
  const hasTranslationsFilter = searchParams.get("has_translations") === "true";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Local search state for debouncing
  const [localSearch, setLocalSearch] = React.useState(searchQuery);
  const debouncedSearch = useDebounce(localSearch, 300);

  // Update URL when debounced search changes
  React.useEffect(() => {
    if (debouncedSearch !== searchQuery) {
      updateParams({ q: debouncedSearch || undefined, page: 1 });
    }
  }, [debouncedSearch]);

  // Fetch data
  const { data: metadata } = useMetadata();
  const { data, isLoading, isError } = useGames({
    q: searchQuery || undefined,
    platform: platformFilter,
    genre: genreFilter,
    has_hacks: hasHacksFilter || undefined,
    has_translations: hasTranslationsFilter || undefined,
    page: currentPage,
    page_size: PAGE_SIZE,
  });

  // Update URL params helper
  const updateParams = (updates: Record<string, string | number | boolean | undefined>) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined || value === false || value === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      }
      return newParams;
    });
  };

  // Column definitions
  const columns: ColumnDef<GameListItem>[] = React.useMemo(
    () => [
      {
        accessorKey: "gametitle",
        header: "Title",
        cell: ({ row }) => (
          <div className="max-w-md">
            <div className="font-medium truncate">{row.original.gametitle}</div>
            {row.original.japtitle && (
              <div className="text-xs text-muted-foreground truncate">
                {row.original.japtitle}
              </div>
            )}
          </div>
        ),
      },
      {
        accessorKey: "platform_name",
        header: "Platform",
        cell: ({ row }) =>
          row.original.platform_name ? (
            <StatusBadge type="console" label={row.original.platform_name} />
          ) : (
            <span className="text-muted-foreground">—</span>
          ),
      },
      {
        accessorKey: "genre_name",
        header: "Genre",
        cell: ({ row }) =>
          row.original.genre_name ? (
            <StatusBadge type="genre" label={row.original.genre_name} />
          ) : (
            <span className="text-muted-foreground">—</span>
          ),
      },
      {
        id: "content",
        header: "Content",
        cell: ({ row }) => (
          <div className="flex gap-1">
            {row.original.hackexist > 0 && (
              <div title="Has Hacks" className="text-green-500">
                <Wrench className="h-4 w-4" />
              </div>
            )}
            {row.original.transexist > 0 && (
              <div title="Has Translations" className="text-purple-500">
                <Languages className="h-4 w-4" />
              </div>
            )}
          </div>
        ),
      },
    ],
    []
  );

  // Clear all filters
  const clearFilters = () => {
    setLocalSearch("");
    setSearchParams({});
  };

  const hasActiveFilters =
    searchQuery ||
    platformFilter !== undefined ||
    genreFilter !== undefined ||
    hasHacksFilter ||
    hasTranslationsFilter;

  // Platform and genre options for filters
  const platformOptions = React.useMemo(
    () =>
      metadata?.consoles.map((c) => ({ id: c.consoleid, label: c.description })) ||
      [],
    [metadata]
  );

  const genreOptions = React.useMemo(
    () =>
      metadata?.genres.map((g) => ({ id: g.genreid, label: g.description })) || [],
    [metadata]
  );

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Games</h1>
          <p className="text-muted-foreground">
            Browse {data?.total?.toLocaleString() || "..."} games in the archive
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden"
          onClick={() => setFilterSidebarOpen(!filterSidebarOpen)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Filter Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 right-0 z-40 w-72 bg-card border-l p-4 transform transition-transform lg:relative lg:inset-auto lg:transform-none lg:border-l-0 lg:border lg:rounded-lg lg:w-64 shrink-0",
            filterSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
          )}
        >
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <h3 className="font-semibold">Filters</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setFilterSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-8rem)] lg:h-auto lg:max-h-[calc(100vh-16rem)]">
            <div className="space-y-6 pr-2">
              {/* Search */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Search</h4>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search games..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              {/* Platform Filter */}
              <FilterGroup
                title="Platform"
                options={platformOptions}
                selected={platformFilter !== undefined ? [platformFilter] : []}
                onChange={(selected) =>
                  updateParams({
                    platform: selected[0],
                    page: 1,
                  })
                }
              />

              {/* Genre Filter */}
              <FilterGroup
                title="Genre"
                options={genreOptions}
                selected={genreFilter !== undefined ? [genreFilter] : []}
                onChange={(selected) =>
                  updateParams({
                    genre: selected[0],
                    page: 1,
                  })
                }
              />

              {/* Content Toggles */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Content</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasHacksFilter}
                      onChange={(e) =>
                        updateParams({
                          has_hacks: e.target.checked || undefined,
                          page: 1,
                        })
                      }
                      className="rounded border-muted-foreground"
                    />
                    <span className="text-sm">Has Hacks</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasTranslationsFilter}
                      onChange={(e) =>
                        updateParams({
                          has_translations: e.target.checked || undefined,
                          page: 1,
                        })
                      }
                      className="rounded border-muted-foreground"
                    />
                    <span className="text-sm">Has Translations</span>
                  </label>
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </ScrollArea>
        </aside>

        {/* Mobile filter overlay */}
        {filterSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setFilterSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-4">
          {isError ? (
            <EmptyState
              title="Error loading games"
              description="There was a problem fetching the game list. Please try again."
              actionLabel="Retry"
              onAction={() => window.location.reload()}
            />
          ) : data?.items.length === 0 && !isLoading ? (
            <EmptyState
              title="No games found"
              description="Try adjusting your filters or search query"
              actionLabel="Clear Filters"
              onAction={clearFilters}
            />
          ) : (
            <>
              <DataTable
                columns={columns}
                data={data?.items || []}
                isLoading={isLoading}
                onRowClick={(row) => navigate(`/games/${row.gamekey}`)}
              />

              {/* Pagination */}
              {data && data.total_pages > 1 && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * PAGE_SIZE + 1} -{" "}
                    {Math.min(currentPage * PAGE_SIZE, data.total)} of{" "}
                    {data.total.toLocaleString()} games
                  </p>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={data.total_pages}
                    onPageChange={(page) => updateParams({ page })}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
