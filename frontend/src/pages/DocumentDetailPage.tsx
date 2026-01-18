import * as React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDocument } from "@/hooks";
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
  FileText,
  Download,
  Calendar,
  Gamepad2,
  ExternalLink,
  GraduationCap,
} from "lucide-react";

/**
 * Document detail page with metadata and download.
 */
export function DocumentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const docId = parseInt(id || "0", 10);

  const { data: document, isLoading, isError } = useDocument(docId);

  if (isError) {
    return (
      <EmptyState
        title="Document not found"
        description="The document you're looking for doesn't exist or couldn't be loaded."
        actionLabel="Back to Documents"
        onAction={() => navigate("/documents")}
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
        <Link to="/documents">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Documents
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
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-2xl truncate">
                    {document?.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    {document?.game_title && (
                      <Link
                        to={`/games/${document.gamekey}`}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        <Gamepad2 className="h-3 w-3" />
                        {document.game_title}
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    )}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {document?.category_name && (
                      <StatusBadge
                        type="category"
                        label={document.category_name}
                      />
                    )}
                    {document?.console_name && (
                      <StatusBadge
                        type="console"
                        label={document.console_name}
                      />
                    )}
                    {document?.skill_level && (
                      <StatusBadge
                        type="status"
                        label={document.skill_level}
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
              ) : document?.description ? (
                <ScrollArea className="max-h-64">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {document.description}
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
              ) : document?.nofile ? (
                <p className="text-sm text-muted-foreground italic">
                  File not available in archive.
                </p>
              ) : (
                <>
                  <Button className="w-full" size="lg">
                    <Download className="h-4 w-4 mr-2" />
                    Download Document
                  </Button>
                  <div className="text-xs text-muted-foreground space-y-1">
                    {document?.filename && (
                      <p className="truncate">File: {document.filename}</p>
                    )}
                    {document?.filesize && (
                      <p>Size: {formatFileSize(document.filesize)}</p>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Skill Level */}
          {document?.skill_level && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Skill Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {document.skill_level}
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
                    {document?.downloads?.toLocaleString() || 0}
                  </dd>

                  <dt className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Created
                  </dt>
                  <dd className="text-right">
                    {document?.created?.split(" ")[0] || "—"}
                  </dd>

                  <dt className="text-muted-foreground">Updated</dt>
                  <dd className="text-right">
                    {document?.lastmod?.split(" ")[0] || "—"}
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
