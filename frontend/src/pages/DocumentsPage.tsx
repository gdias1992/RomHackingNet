import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDocuments, useMetadata } from "@/hooks";
import { FilterGroup } from "@/components/shared/FilterGroup";
import { Pagination } from "@/components/shared/Pagination";
import { EmptyState } from "@/components/shared/EmptyState";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, X, Filter, FileText, Download } from "lucide-react";
import { cn } from "@/utils/cn";
import { useDebounce } from "@/hooks/useDebounce";

const PAGE_SIZE = 24;

/**
 * Documents Explorer page with grid view and filters.
 */
export function DocumentsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterSidebarOpen, setFilterSidebarOpen] = React.useState(false);

  // Parse URL params
  const searchQuery = searchParams.get("q") || "";
  const consoleFilter = searchParams.get("console")
    ? parseInt(searchParams.get("console")!, 10)
    : undefined;
  const categoryFilter = searchParams.get("category")
    ? parseInt(searchParams.get("category")!, 10)
    : undefined;
  const skillFilter = searchParams.get("skill_level")
    ? parseInt(searchParams.get("skill_level")!, 10)
    : undefined;
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Local search state
  const [localSearch, setLocalSearch] = React.useState(searchQuery);
  const debouncedSearch = useDebounce(localSearch, 300);

  React.useEffect(() => {
    if (debouncedSearch !== searchQuery) {
      updateParams({ q: debouncedSearch || undefined, page: 1 });
    }
  }, [debouncedSearch]);

  // Fetch data
  const { data: metadata } = useMetadata();
  const { data, isLoading, isError } = useDocuments({
    q: searchQuery || undefined,
    console: consoleFilter,
    category: categoryFilter,
    skill_level: skillFilter,
    page: currentPage,
    page_size: PAGE_SIZE,
  });

  const updateParams = (
    updates: Record<string, string | number | undefined>
  ) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined || value === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      }
      return newParams;
    });
  };

  const clearFilters = () => {
    setLocalSearch("");
    setSearchParams({});
  };

  const hasActiveFilters =
    searchQuery ||
    consoleFilter !== undefined ||
    categoryFilter !== undefined ||
    skillFilter !== undefined;

  // Filter options
  const consoleOptions = React.useMemo(
    () =>
      metadata?.consoles.map((c) => ({
        id: c.consoleid,
        label: c.description,
      })) || [],
    [metadata]
  );

  const categoryOptions = React.useMemo(
    () =>
      metadata?.doc_categories.map((c) => ({
        id: c.categoryid,
        label: c.description,
      })) || [],
    [metadata]
  );

  const skillOptions = React.useMemo(
    () =>
      metadata?.skill_levels.map((s) => ({
        id: s.levelid,
        label: s.description,
      })) || [],
    [metadata]
  );

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-muted-foreground">
            Browse {data?.total?.toLocaleString() || "..."} documents in the
            archive
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
            filterSidebarOpen
              ? "translate-x-0"
              : "translate-x-full lg:translate-x-0"
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
                    placeholder="Search documents..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <FilterGroup
                title="Category"
                options={categoryOptions}
                selected={categoryFilter !== undefined ? [categoryFilter] : []}
                onChange={(selected) =>
                  updateParams({ category: selected[0], page: 1 })
                }
              />

              {/* Console Filter */}
              <FilterGroup
                title="Console"
                options={consoleOptions}
                selected={consoleFilter !== undefined ? [consoleFilter] : []}
                onChange={(selected) =>
                  updateParams({ console: selected[0], page: 1 })
                }
              />

              {/* Skill Level Filter */}
              <FilterGroup
                title="Skill Level"
                options={skillOptions}
                selected={skillFilter !== undefined ? [skillFilter] : []}
                onChange={(selected) =>
                  updateParams({ skill_level: selected[0], page: 1 })
                }
              />

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

        {/* Main Content - Grid View */}
        <div className="flex-1 min-w-0 space-y-4">
          {isError ? (
            <EmptyState
              title="Error loading documents"
              description="There was a problem fetching the documents list."
              actionLabel="Retry"
              onAction={() => window.location.reload()}
            />
          ) : data?.items.length === 0 && !isLoading ? (
            <EmptyState
              title="No documents found"
              description="Try adjusting your filters or search query"
              actionLabel="Clear Filters"
              onAction={clearFilters}
            />
          ) : (
            <>
              {/* Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {isLoading
                  ? Array.from({ length: 12 }).map((_, i) => (
                      <Card key={i} className="overflow-hidden">
                        <Skeleton className="aspect-video w-full" />
                        <CardContent className="p-3 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </CardContent>
                      </Card>
                    ))
                  : data?.items.map((document) => (
                      <Card
                        key={document.dockey}
                        className="overflow-hidden cursor-pointer hover:bg-accent/50 transition-colors"
                        onClick={() =>
                          navigate(`/documents/${document.dockey}`)
                        }
                      >
                        {/* Placeholder for icon */}
                        <div className="aspect-video bg-muted flex items-center justify-center">
                          <FileText className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <CardContent className="p-3">
                          <h3 className="font-medium truncate text-sm">
                            {document.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            {document.category_name && (
                              <StatusBadge
                                type="category"
                                label={document.category_name}
                                className="text-[10px]"
                              />
                            )}
                            {document.skill_level && (
                              <StatusBadge
                                type="status"
                                label={document.skill_level}
                                className="text-[10px]"
                              />
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                            <Download className="h-3 w-3" />
                            <span>
                              {document.downloads?.toLocaleString() || 0}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
              </div>

              {/* Pagination */}
              {data && data.total_pages > 1 && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * PAGE_SIZE + 1} -{" "}
                    {Math.min(currentPage * PAGE_SIZE, data.total)} of{" "}
                    {data.total.toLocaleString()} documents
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
