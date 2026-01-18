import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import type {
  HomebrewDetail,
  HomebrewListItem,
  HomebrewQueryParams,
  PaginatedResponse,
} from "@/api/types";

/**
 * Build query string from params object.
 */
function buildQueryString(params: HomebrewQueryParams): string {
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
 * Fetches paginated homebrew from the API.
 */
async function fetchHomebrews(
  params: HomebrewQueryParams
): Promise<PaginatedResponse<HomebrewListItem>> {
  const response = await apiClient.get<PaginatedResponse<HomebrewListItem>>(
    `/homebrew${buildQueryString(params)}`
  );
  return response.data;
}

type HomebrewsQueryOptions = Omit<
  UseQueryOptions<PaginatedResponse<HomebrewListItem>>,
  "queryKey" | "queryFn"
>;

/**
 * Hook to fetch paginated homebrew with filters.
 */
export function useHomebrews(
  params: HomebrewQueryParams = {},
  options?: HomebrewsQueryOptions
) {
  return useQuery({
    queryKey: ["homebrew", params],
    queryFn: () => fetchHomebrews(params),
    ...options,
  });
}

/**
 * Fetches a single homebrew by ID.
 */
async function fetchHomebrew(homebrewkey: number): Promise<HomebrewDetail> {
  const response = await apiClient.get<HomebrewDetail>(
    `/homebrew/${homebrewkey}`
  );
  return response.data;
}

/**
 * Hook to fetch a single homebrew with details.
 */
export function useHomebrew(homebrewkey: number) {
  return useQuery({
    queryKey: ["homebrew", homebrewkey],
    queryFn: () => fetchHomebrew(homebrewkey),
    enabled: !!homebrewkey,
  });
}
