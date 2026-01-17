import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import type {
  HackDetail,
  HackImage,
  HackListItem,
  HackQueryParams,
  PaginatedResponse,
} from "@/api/types";

/**
 * Build query string from params object.
 */
function buildQueryString(params: HackQueryParams): string {
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
 * Fetches paginated hacks from the API.
 */
async function fetchHacks(
  params: HackQueryParams
): Promise<PaginatedResponse<HackListItem>> {
  const response = await apiClient.get<PaginatedResponse<HackListItem>>(
    `/hacks${buildQueryString(params)}`
  );
  return response.data;
}

/**
 * Hook to fetch paginated hacks with filters.
 */
export function useHacks(params: HackQueryParams = {}) {
  return useQuery({
    queryKey: ["hacks", params],
    queryFn: () => fetchHacks(params),
  });
}

/**
 * Fetches a single hack by ID.
 */
async function fetchHack(hackkey: number): Promise<HackDetail> {
  const response = await apiClient.get<HackDetail>(`/hacks/${hackkey}`);
  return response.data;
}

/**
 * Hook to fetch a single hack with details.
 */
export function useHack(hackkey: number) {
  return useQuery({
    queryKey: ["hacks", hackkey],
    queryFn: () => fetchHack(hackkey),
    enabled: !!hackkey,
  });
}

/**
 * Fetches images for a specific hack.
 */
async function fetchHackImages(hackkey: number): Promise<HackImage[]> {
  const response = await apiClient.get<HackImage[]>(`/hacks/${hackkey}/images`);
  return response.data;
}

/**
 * Hook to fetch images for a specific hack.
 */
export function useHackImages(hackkey: number) {
  return useQuery({
    queryKey: ["hacks", hackkey, "images"],
    queryFn: () => fetchHackImages(hackkey),
    enabled: !!hackkey,
  });
}
