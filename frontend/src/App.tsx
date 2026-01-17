import { useHealth } from "@/hooks/useHealth";
import { Database, Server, Loader2 } from "lucide-react";

function App() {
  const { data: health, isLoading, isError } = useHealth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">
            RomHacking.net Archive Explorer
          </h1>
          <p className="text-sm text-muted-foreground">
            Browse the 2024 end-of-life data archive
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Status Card */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">System Status</h2>

            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Checking connection...</span>
              </div>
            )}

            {isError && (
              <div className="flex items-center gap-2 text-destructive">
                <span className="h-2 w-2 rounded-full bg-destructive" />
                <span>Failed to connect to backend</span>
              </div>
            )}

            {health && (
              <div className="space-y-3">
                {/* API Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <span>API Server</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        health.status === "healthy"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    />
                    <span className="text-sm text-muted-foreground">
                      v{health.version}
                    </span>
                  </div>
                </div>

                {/* Database Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span>Database</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        health.database === "connected"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                    <span className="text-sm text-muted-foreground capitalize">
                      {health.database}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Getting Started */}
          <div className="mt-8 rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Getting Started</h2>
            <p className="text-muted-foreground text-sm">
              The RomHacking.net Archive Explorer is ready for development. The
              backend API and frontend are connected and communicating
              successfully.
            </p>
            <div className="mt-4 p-3 bg-muted rounded-md">
              <code className="text-sm">
                Backend: http://127.0.0.1:8000/docs
              </code>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
