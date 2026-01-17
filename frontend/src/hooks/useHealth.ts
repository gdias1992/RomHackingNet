import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import type { HealthResponse } from "@/api/types";

/**
 * Fetches the health status from the API.
 */
async function fetchHealth(): Promise<HealthResponse> {
  const response = await apiClient.get<HealthResponse>("/health");
  return response.data;
}

/**
 * Hook to check the health status of the backend API.
 */
export function useHealth() {
  return useQuery({
    queryKey: ["health"],
    queryFn: fetchHealth,
    retry: 1,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}
