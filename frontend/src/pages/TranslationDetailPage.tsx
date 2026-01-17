import * as React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation, useTranslationImages } from "@/hooks";
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
  Languages,
  Download,
  Calendar,
  FileText,
  Info,
  Gamepad2,
  ExternalLink,
} from "lucide-react";

/**
 * Translation detail page with screenshots, metadata, and download.
 */
export function TranslationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const transId = parseInt(id || "0", 10);

  const { data: translation, isLoading, isError } = useTranslation(transId);
  const { data: images } = useTranslationImages(transId);

  // Convert images to gallery format
  const screenshots = React.useMemo(() => {
    if (!images) return [];
    return images.map((img) => ({
      src: `/files/translations/images/${img.filename}`,
      alt: img.caption || undefined,
      caption: img.caption || undefined,
    }));
  }, [images]);

  if (isError) {
    return (
      <EmptyState
        title="Translation not found"
        description="The translation you're looking for doesn't exist or couldn't be loaded."
        actionLabel="Back to Translations"
        onAction={() => navigate("/translations")}
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
        <Link to="/translations">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Translations
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
                  <Languages className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-2xl truncate">
                    {translation?.game_title || "Translation"} -{" "}
                    {translation?.language_name || "Unknown"}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    {translation?.game_title && translation?.gamekey && (
                      <Link
                        to={`/games/${translation.gamekey}`}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        <Gamepad2 className="h-3 w-3" />
                        {translation.game_title}
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    )}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {translation?.console_name && (
                      <StatusBadge
                        type="console"
                        label={translation.console_name}
                      />
                    )}
                    {translation?.language_name && (
                      <StatusBadge
                        type="language"
                        label={translation.language_name}
                      />
                    )}
                    {translation?.status_name && (
                      <StatusBadge
                        type="status"
                        label={translation.status_name}
                      />
                    )}
                    {translation?.version && (
                      <StatusBadge
                        type="category"
                        label={`v${translation.version}`}
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
              ) : translation?.description ? (
                <ScrollArea className="max-h-64">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {translation.description}
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
              ) : translation?.nofile ? (
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
                    {translation?.filename && (
                      <p className="truncate">File: {translation.filename}</p>
                    )}
                    {translation?.filesize && (
                      <p>Size: {formatFileSize(translation.filesize)}</p>
                    )}
                    {translation?.patchtype && (
                      <p>Type: {translation.patchtype}</p>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Patching Info */}
          {translation?.patch_hint && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Patching Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {translation.patch_hint}
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
                    {translation?.downloads?.toLocaleString() || 0}
                  </dd>

                  <dt className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Released
                  </dt>
                  <dd className="text-right">
                    {translation?.releasedate || "—"}
                  </dd>

                  <dt className="text-muted-foreground">Created</dt>
                  <dd className="text-right">
                    {translation?.created?.split(" ")[0] || "—"}
                  </dd>

                  <dt className="text-muted-foreground">Updated</dt>
                  <dd className="text-right">
                    {translation?.lastmod?.split(" ")[0] || "—"}
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
