import * as React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useHomebrew } from "@/hooks";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  Joystick,
  Download,
  Calendar,
  FileText,
} from "lucide-react";

/**
 * Homebrew detail page with metadata and download.
 */
export function HomebrewDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const homebrewId = parseInt(id || "0", 10);

  const { data: homebrew, isLoading, isError } = useHomebrew(homebrewId);

  if (isError) {
    return (
      <EmptyState
        title="Homebrew not found"
        description="The homebrew game you're looking for doesn't exist or couldn't be loaded."
        actionLabel="Back to Homebrew"
        onAction={() => navigate("/homebrew")}
      />
    );
  }

  const formatFileSize = (bytes: number | null | undefined) => {
    if (!bytes) return "Unknown";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild>
        <Link to="/homebrew">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Homebrew
        </Link>
      </Button>

      {/* Header Card */}
      <Card>
        <CardHeader>
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </>
          ) : (
            <>
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-muted p-3">
                  <Joystick className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-2xl truncate">
                    {homebrew?.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {homebrew?.category_name && (
                      <StatusBadge
                        type="category"
                        label={homebrew.category_name}
                      />
                    )}
                    {homebrew?.platform_name && (
                      <StatusBadge
                        type="console"
                        label={homebrew.platform_name}
                      />
                    )}
                    {homebrew?.version && (
                      <StatusBadge
                        type="status"
                        label={`v${homebrew.version}`}
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : homebrew?.description ? (
                <ScrollArea className="max-h-64">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {homebrew.description}
                  </p>
                </ScrollArea>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No description available.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Download */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Download</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : homebrew?.nofile ? (
                <p className="text-sm text-muted-foreground italic">
                  File not available in archive.
                </p>
              ) : (
                <>
                  <Button className="w-full" size="lg">
                    <Download className="h-4 w-4 mr-2" />
                    Download Homebrew
                  </Button>
                  <div className="text-xs text-muted-foreground space-y-1">
                    {homebrew?.filename && (
                      <p className="truncate">File: {homebrew.filename}</p>
                    )}
                    {homebrew?.filesize && (
                      <p>Size: {formatFileSize(homebrew.filesize)}</p>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              ) : (
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="text-muted-foreground">Downloads</dt>
                  <dd className="font-medium text-right">
                    {homebrew?.downloads?.toLocaleString() || 0}
                  </dd>

                  <dt className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Released
                  </dt>
                  <dd className="text-right">{homebrew?.releasedate || "—"}</dd>

                  <dt className="text-muted-foreground">Created</dt>
                  <dd className="text-right">
                    {homebrew?.created?.split(" ")[0] || "—"}
                  </dd>

                  <dt className="text-muted-foreground">Updated</dt>
                  <dd className="text-right">
                    {homebrew?.lastmod?.split(" ")[0] || "—"}
                  </dd>
                </dl>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
