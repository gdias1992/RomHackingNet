import { useHealth } from "@/hooks/useHealth";
import { useGames, useHacks, useTranslations, useMetadata } from "@/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Gamepad2,
  Wrench,
  Languages,
  Database,
  Server,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Dashboard page with archive metrics and system status.
 */
export function DashboardPage() {
  const { data: health, isLoading: healthLoading } = useHealth();
  const { data: gamesData, isLoading: gamesLoading } = useGames({ page_size: 1 });
  const { data: hacksData, isLoading: hacksLoading } = useHacks({ page_size: 1 });
  const { data: translationsData, isLoading: translationsLoading } = useTranslations({ page_size: 1 });
  const { data: metadata, isLoading: metadataLoading } = useMetadata();

  const stats = [
    {
      label: "Total Games",
      value: gamesData?.total,
      icon: Gamepad2,
      link: "/games",
      loading: gamesLoading,
      color: "text-blue-500",
    },
    {
      label: "ROM Hacks",
      value: hacksData?.total,
      icon: Wrench,
      link: "/hacks",
      loading: hacksLoading,
      color: "text-green-500",
    },
    {
      label: "Translations",
      value: translationsData?.total,
      icon: Languages,
      link: "/translations",
      loading: translationsLoading,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of the RomHacking.net archive
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.link}>
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                {stat.loading ? (
                  <Skeleton className="h-8 w-24" />
                ) : (
                  <div className="text-2xl font-bold">
                    {stat.value?.toLocaleString() || 0}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* System Status and Metadata */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              System Status
            </CardTitle>
            <CardDescription>Backend and database connectivity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {healthLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <span>API Server</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        health?.status === "healthy"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    />
                    <span className="text-sm text-muted-foreground">
                      v{health?.version || "?"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span>Database</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        health?.database === "connected"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                    <span className="text-sm text-muted-foreground capitalize">
                      {health?.database || "unknown"}
                    </span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Metadata Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Archive Metadata
            </CardTitle>
            <CardDescription>Reference data categories</CardDescription>
          </CardHeader>
          <CardContent>
            {metadataLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platforms</span>
                  <span className="font-medium">
                    {metadata?.consoles.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Genres</span>
                  <span className="font-medium">
                    {metadata?.genres.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Languages</span>
                  <span className="font-medium">
                    {metadata?.languages.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hack Categories</span>
                  <span className="font-medium">
                    {metadata?.hack_categories.length || 0}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
          <CardDescription>Jump to popular sections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/games?platform=1"
              className="flex items-center gap-2 rounded-md border p-3 hover:bg-accent transition-colors"
            >
              <Gamepad2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">NES Games</span>
            </Link>
            <Link
              to="/games?platform=2"
              className="flex items-center gap-2 rounded-md border p-3 hover:bg-accent transition-colors"
            >
              <Gamepad2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">SNES Games</span>
            </Link>
            <Link
              to="/translations?language=1"
              className="flex items-center gap-2 rounded-md border p-3 hover:bg-accent transition-colors"
            >
              <Languages className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">English Translations</span>
            </Link>
            <Link
              to="/hacks"
              className="flex items-center gap-2 rounded-md border p-3 hover:bg-accent transition-colors"
            >
              <Wrench className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">All ROM Hacks</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
