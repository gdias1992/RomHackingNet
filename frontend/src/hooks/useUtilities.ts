import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import type {
  UtilityDetail,
  UtilityListItem,
  UtilityQueryParams,
  PaginatedResponse,
} from "@/api/types";

/**
 * Build query string from params object.
 */
function buildQueryString(params: UtilityQueryParams): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

/**
 * Fetches paginated utilities from the API.
 */
async function fetchUtilities(
  params: UtilityQueryParams
): Promise<PaginatedResponse<UtilityListItem>> {
  const response = await apiClient.get<PaginatedResponse<UtilityListItem>>(
    `/utilities${buildQueryString(params)}`
  );
  return response.data;
}

type UtilitiesQueryOptions = Omit<
  UseQueryOptions<PaginatedResponse<UtilityListItem>>,
  "queryKey" | "queryFn"
>;

/**
 * Hook to fetch paginated utilities with filters.
 */
export function useUtilities(
  params: UtilityQueryParams = {},
  options?: UtilitiesQueryOptions
) {
  return useQuery({
    queryKey: ["utilities", params],
    queryFn: () => fetchUtilities(params),
    ...options,
  });
}

/**
 * Fetches a single utility by ID.
 */
async function fetchUtility(utilkey: number): Promise<UtilityDetail> {
  const response = await apiClient.get<UtilityDetail>(`/utilities/${utilkey}`);
  return response.data;
}

/**
 * Hook to fetch a single utility with details.
 */
export function useUtility(utilkey: number) {
  return useQuery({
    queryKey: ["utilities", utilkey],
    queryFn: () => fetchUtility(utilkey),
    enabled: !!utilkey,
  });
}
