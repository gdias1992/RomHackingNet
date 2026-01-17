import * as React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGame, useGameHacks, useGameTranslations } from "@/hooks";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Pagination } from "@/components/shared/Pagination";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { type ColumnDef } from "@tanstack/react-table";
import type { HackListItem, TranslationListItem } from "@/api/types";
import { ArrowLeft, Wrench, Languages, Gamepad2 } from "lucide-react";

const PAGE_SIZE = 20;

/**
 * Game details page with hacks and translations tabs.
 */
export function GameDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const gameId = parseInt(id || "0", 10);

  const [activeTab, setActiveTab] = React.useState("hacks");
  const [hacksPage, setHacksPage] = React.useState(1);
  const [translationsPage, setTranslationsPage] = React.useState(1);

  const { data: game, isLoading: gameLoading, isError } = useGame(gameId);
  const { data: hacksData, isLoading: hacksLoading } = useGameHacks(
    gameId,
    hacksPage,
    PAGE_SIZE
  );
  const { data: translationsData, isLoading: translationsLoading } =
    useGameTranslations(gameId, translationsPage, PAGE_SIZE);

  // Hack columns
  const hackColumns: ColumnDef<HackListItem>[] = React.useMemo(
    () => [
      {
        accessorKey: "hacktitle",
        header: "Title",
        cell: ({ row }) => (
          <div className="max-w-md">
            <div className="font-medium truncate">{row.original.hacktitle}</div>
            {row.original.version && (
              <div className="text-xs text-muted-foreground">
                v{row.original.version}
              </div>
            )}
          </div>
        ),
      },
      {
        accessorKey: "category_name",
        header: "Category",
        cell: ({ row }) =>
          row.original.category_name ? (
            <StatusBadge type="category" label={row.original.category_name} />
          ) : (
            <span className="text-muted-foreground">—</span>
          ),
      },
      {
        accessorKey: "downloads",
        header: "Downloads",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.original.downloads?.toLocaleString() || 0}
          </span>
        ),
      },
      {
        accessorKey: "releasedate",
        header: "Released",
        cell: ({ row }) => (
          <span className="text-muted-foreground text-sm">
            {row.original.releasedate || "—"}
          </span>
        ),
      },
    ],
    []
  );

  // Translation columns
  const translationColumns: ColumnDef<TranslationListItem>[] = React.useMemo(
    () => [
      {
        accessorKey: "language_name",
        header: "Language",
        cell: ({ row }) =>
          row.original.language_name ? (
            <StatusBadge type="language" label={row.original.language_name} />
          ) : (
            <span className="text-muted-foreground">—</span>
          ),
      },
      {
        accessorKey: "status_name",
        header: "Status",
        cell: ({ row }) =>
          row.original.status_name ? (
            <StatusBadge type="status" label={row.original.status_name} />
          ) : (
            <span className="text-muted-foreground">—</span>
          ),
      },
      {
        accessorKey: "version",
        header: "Version",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.original.version || "—"}
          </span>
        ),
      },
      {
        accessorKey: "downloads",
        header: "Downloads",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.original.downloads?.toLocaleString() || 0}
          </span>
        ),
      },
    ],
    []
  );

  if (isError) {
    return (
      <EmptyState
        title="Game not found"
        description="The game you're looking for doesn't exist or couldn't be loaded."
        actionLabel="Back to Games"
        onAction={() => navigate("/games")}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild>
        <Link to="/games">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Games
        </Link>
      </Button>

      {/* Game Header */}
      <Card>
        <CardHeader>
          {gameLoading ? (
            <>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-48" />
            </>
          ) : (
            <>
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-muted p-3">
                  <Gamepad2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl">{game?.gametitle}</CardTitle>
                  {game?.japtitle && (
                    <p className="text-muted-foreground">{game.japtitle}</p>
                  )}
                  <div className="flex gap-2 mt-2">
                    {game?.platform_name && (
                      <StatusBadge type="console" label={game.platform_name} />
                    )}
                    {game?.genre_name && (
                      <StatusBadge type="genre" label={game.genre_name} />
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </CardHeader>
        <CardContent>
          {gameLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-16" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-lg border p-3 text-center">
                <div className="text-2xl font-bold text-green-500">
                  {game?.hack_count || 0}
                </div>
                <div className="text-xs text-muted-foreground">Hacks</div>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <div className="text-2xl font-bold text-purple-500">
                  {game?.translation_count || 0}
                </div>
                <div className="text-xs text-muted-foreground">Translations</div>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {game?.utility_count || 0}
                </div>
                <div className="text-xs text-muted-foreground">Utilities</div>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <div className="text-2xl font-bold text-orange-500">
                  {game?.document_count || 0}
                </div>
                <div className="text-xs text-muted-foreground">Documents</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resources Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="hacks" className="gap-2">
            <Wrench className="h-4 w-4" />
            Hacks ({game?.hack_count || 0})
          </TabsTrigger>
          <TabsTrigger value="translations" className="gap-2">
            <Languages className="h-4 w-4" />
            Translations ({game?.translation_count || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hacks" className="space-y-4">
          {hacksData?.items.length === 0 && !hacksLoading ? (
            <EmptyState
              title="No hacks available"
              description="There are no ROM hacks for this game yet."
              icon={<Wrench className="h-8 w-8 text-muted-foreground" />}
            />
          ) : (
            <>
              <DataTable
                columns={hackColumns}
                data={hacksData?.items || []}
                isLoading={hacksLoading}
                onRowClick={(row) => navigate(`/hacks/${row.hackkey}`)}
              />
              {hacksData && hacksData.total_pages > 1 && (
                <div className="flex justify-end">
                  <Pagination
                    currentPage={hacksPage}
                    totalPages={hacksData.total_pages}
                    onPageChange={setHacksPage}
                  />
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="translations" className="space-y-4">
          {translationsData?.items.length === 0 && !translationsLoading ? (
            <EmptyState
              title="No translations available"
              description="There are no translations for this game yet."
              icon={<Languages className="h-8 w-8 text-muted-foreground" />}
            />
          ) : (
            <>
              <DataTable
                columns={translationColumns}
                data={translationsData?.items || []}
                isLoading={translationsLoading}
                onRowClick={(row) => navigate(`/translations/${row.transkey}`)}
              />
              {translationsData && translationsData.total_pages > 1 && (
                <div className="flex justify-end">
                  <Pagination
                    currentPage={translationsPage}
                    totalPages={translationsData.total_pages}
                    onPageChange={setTranslationsPage}
                  />
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
