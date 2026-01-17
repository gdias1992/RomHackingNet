import * as React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useHack, useHackImages } from "@/hooks";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ScreenshotGallery } from "@/components/shared/ScreenshotGallery";
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
  Wrench,
  Download,
  Calendar,
  FileText,
  Info,
  Gamepad2,
  ExternalLink,
} from "lucide-react";

/**
 * Hack detail page with screenshots, metadata, and download.
 */
export function HackDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const hackId = parseInt(id || "0", 10);

  const { data: hack, isLoading, isError } = useHack(hackId);
  const { data: images } = useHackImages(hackId);

  // Convert images to gallery format
  const screenshots = React.useMemo(() => {
    if (!images) return [];
    return images.map((img) => ({
      src: `/files/hacks/images/${img.filename}`,
      alt: img.caption || undefined,
      caption: img.caption || undefined,
    }));
  }, [images]);

  if (isError) {
    return (
      <EmptyState
        title="Hack not found"
        description="The ROM hack you're looking for doesn't exist or couldn't be loaded."
        actionLabel="Back to Hacks"
        onAction={() => navigate("/hacks")}
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
        <Link to="/hacks">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Hacks
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
                  <Wrench className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-2xl truncate">
                    {hack?.hacktitle}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    {hack?.game_title && (
                      <Link
                        to={`/games/${hack.gamekey}`}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        <Gamepad2 className="h-3 w-3" />
                        {hack.game_title}
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    )}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {hack?.console_name && (
                      <StatusBadge type="console" label={hack.console_name} />
                    )}
                    {hack?.category_name && (
                      <StatusBadge type="category" label={hack.category_name} />
                    )}
                    {hack?.version && (
                      <StatusBadge type="status" label={`v${hack.version}`} />
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
          {/* Screenshots */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Screenshots</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-video" />
                  ))}
                </div>
              ) : (
                <ScreenshotGallery screenshots={screenshots} />
              )}
            </CardContent>
          </Card>

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
              ) : hack?.description ? (
                <ScrollArea className="max-h-64">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {hack.description}
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
              ) : hack?.nofile ? (
                <p className="text-sm text-muted-foreground italic">
                  File not available in archive.
                </p>
              ) : (
                <>
                  <Button className="w-full" size="lg">
                    <Download className="h-4 w-4 mr-2" />
                    Download Patch
                  </Button>
                  <div className="text-xs text-muted-foreground space-y-1">
                    {hack?.filename && (
                      <p className="truncate">File: {hack.filename}</p>
                    )}
                    {hack?.filesize && (
                      <p>Size: {formatFileSize(hack.filesize)}</p>
                    )}
                    {hack?.patchtype && <p>Type: {hack.patchtype}</p>}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Patching Info */}
          {hack?.patch_hint && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Patching Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {hack.patch_hint}
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
                    {hack?.downloads?.toLocaleString() || 0}
                  </dd>

                  <dt className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Released
                  </dt>
                  <dd className="text-right">{hack?.releasedate || "—"}</dd>

                  <dt className="text-muted-foreground">Created</dt>
                  <dd className="text-right">
                    {hack?.created?.split(" ")[0] || "—"}
                  </dd>

                  <dt className="text-muted-foreground">Updated</dt>
                  <dd className="text-right">
                    {hack?.lastmod?.split(" ")[0] || "—"}
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
