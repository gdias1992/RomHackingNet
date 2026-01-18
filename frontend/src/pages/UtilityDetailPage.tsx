import * as React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useUtility } from "@/hooks";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  Package,
  Download,
  Calendar,
  FileText,
  Gamepad2,
  ExternalLink,
  Monitor,
  Scale,
} from "lucide-react";

/**
 * Utility detail page with metadata and download.
 */
export function UtilityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const utilId = parseInt(id || "0", 10);

  const { data: utility, isLoading, isError } = useUtility(utilId);

  if (isError) {
    return (
      <EmptyState
        title="Utility not found"
        description="The utility you're looking for doesn't exist or couldn't be loaded."
        actionLabel="Back to Utilities"
        onAction={() => navigate("/utilities")}
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
        <Link to="/utilities">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Utilities
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
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-2xl truncate">
                    {utility?.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    {utility?.game_title && (
                      <Link
                        to={`/games/${utility.gamekey}`}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        <Gamepad2 className="h-3 w-3" />
                        {utility.game_title}
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    )}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {utility?.category_name && (
                      <StatusBadge
                        type="category"
                        label={utility.category_name}
                      />
                    )}
                    {utility?.console_name && (
                      <StatusBadge type="console" label={utility.console_name} />
                    )}
                    {utility?.os_name && (
                      <StatusBadge type="status" label={utility.os_name} />
                    )}
                    {utility?.version && (
                      <StatusBadge type="status" label={`v${utility.version}`} />
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
              ) : utility?.description ? (
                <ScrollArea className="max-h-64">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {utility.description}
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
              ) : utility?.nofile ? (
                <p className="text-sm text-muted-foreground italic">
                  File not available in archive.
                </p>
              ) : (
                <>
                  <Button className="w-full" size="lg">
                    <Download className="h-4 w-4 mr-2" />
                    Download Utility
                  </Button>
                  <div className="text-xs text-muted-foreground space-y-1">
                    {utility?.filename && (
                      <p className="truncate">File: {utility.filename}</p>
                    )}
                    {utility?.filesize && (
                      <p>Size: {formatFileSize(utility.filesize)}</p>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* License Info */}
          {utility?.license_name && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  License
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {utility.license_name}
                </p>
              </CardContent>
            </Card>
          )}

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
                    {utility?.downloads?.toLocaleString() || 0}
                  </dd>

                  {utility?.os_name && (
                    <>
                      <dt className="text-muted-foreground flex items-center gap-1">
                        <Monitor className="h-3 w-3" />
                        Platform
                      </dt>
                      <dd className="text-right">{utility.os_name}</dd>
                    </>
                  )}

                  <dt className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Released
                  </dt>
                  <dd className="text-right">{utility?.releasedate || "—"}</dd>

                  <dt className="text-muted-foreground">Created</dt>
                  <dd className="text-right">
                    {utility?.created?.split(" ")[0] || "—"}
                  </dd>

                  <dt className="text-muted-foreground">Updated</dt>
                  <dd className="text-right">
                    {utility?.lastmod?.split(" ")[0] || "—"}
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
