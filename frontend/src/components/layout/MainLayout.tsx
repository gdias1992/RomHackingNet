import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import {
  Gamepad2,
  Wrench,
  Languages,
  Home,
  Database,
  Server,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  FileText,
  Package,
  Joystick,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { useHealth } from "@/hooks/useHealth";
import { GlobalSearch } from "@/components/shared/GlobalSearch";

const navItems = [
  { to: "/", icon: Home, label: "Dashboard" },
  { to: "/games", icon: Gamepad2, label: "Games" },
  { to: "/hacks", icon: Wrench, label: "ROM Hacks" },
  { to: "/translations", icon: Languages, label: "Translations" },
  { to: "/utilities", icon: Package, label: "Utilities", disabled: true },
  { to: "/documents", icon: FileText, label: "Documents", disabled: true },
  { to: "/homebrew", icon: Joystick, label: "Homebrew", disabled: true },
];

/**
 * Main application layout with sidebar and top bar.
 */
export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const { data: health } = useHealth();

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <button
        type="button"
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-md bg-background border"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform duration-200",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <h1 className="text-lg font-bold">RomHacking.net</h1>
            <p className="text-xs text-muted-foreground">Archive Explorer</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.disabled ? "#" : item.to}
                onClick={(e) => {
                  if (item.disabled) e.preventDefault();
                  else setSidebarOpen(false);
                }}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive && !item.disabled
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground",
                    item.disabled && "opacity-50 cursor-not-allowed"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {item.disabled && (
                  <span className="ml-auto text-[10px] bg-muted px-1.5 py-0.5 rounded">
                    Soon
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Status Footer */}
          <div className="p-4 border-t text-xs text-muted-foreground">
            <div className="flex items-center gap-2 mb-1">
              <Server className="h-3 w-3" />
              <span>API:</span>
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  health?.status === "healthy" ? "bg-green-500" : "bg-yellow-500"
                )}
              />
              <span>{health?.version || "..."}</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-3 w-3" />
              <span>DB:</span>
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  health?.database === "connected"
                    ? "bg-green-500"
                    : "bg-red-500"
                )}
              />
              <span className="capitalize">{health?.database || "..."}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between h-14 px-4 lg:px-6">
            {/* Search */}
            <Button
              variant="outline"
              className="w-full max-w-sm justify-start text-muted-foreground"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="ml-auto hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-4">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {darkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      {/* Global Search */}
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
