import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import type {
  GameDetail,
  GameListItem,
  GameQueryParams,
  HackListItem,
  PaginatedResponse,
  TranslationListItem,
} from "@/api/types";

/**
 * Build query string from params object.
 */
function buildQueryString(params: GameQueryParams): string {
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
 * Fetches paginated games from the API.
 */
async function fetchGames(
  params: GameQueryParams
): Promise<PaginatedResponse<GameListItem>> {
  const response = await apiClient.get<PaginatedResponse<GameListItem>>(
    `/games${buildQueryString(params)}`
  );
  return response.data;
}

/**
 * Hook to fetch paginated games with filters.
 */
export function useGames(params: GameQueryParams = {}) {
  return useQuery({
    queryKey: ["games", params],
    queryFn: () => fetchGames(params),
  });
}

/**
 * Fetches a single game by ID.
 */
async function fetchGame(gamekey: number): Promise<GameDetail> {
  const response = await apiClient.get<GameDetail>(`/games/${gamekey}`);
  return response.data;
}

/**
 * Hook to fetch a single game with details.
 */
export function useGame(gamekey: number) {
  return useQuery({
    queryKey: ["games", gamekey],
    queryFn: () => fetchGame(gamekey),
    enabled: !!gamekey,
  });
}

/**
 * Fetches hacks for a specific game.
 */
async function fetchGameHacks(
  gamekey: number,
  page: number = 1,
  pageSize: number = 50
): Promise<PaginatedResponse<HackListItem>> {
  const response = await apiClient.get<PaginatedResponse<HackListItem>>(
    `/games/${gamekey}/hacks?page=${page}&page_size=${pageSize}`
  );
  return response.data;
}

/**
 * Hook to fetch hacks for a specific game.
 */
export function useGameHacks(gamekey: number, page: number = 1, pageSize: number = 50) {
  return useQuery({
    queryKey: ["games", gamekey, "hacks", { page, pageSize }],
    queryFn: () => fetchGameHacks(gamekey, page, pageSize),
    enabled: !!gamekey,
  });
}

/**
 * Fetches translations for a specific game.
 */
async function fetchGameTranslations(
  gamekey: number,
  page: number = 1,
  pageSize: number = 50
): Promise<PaginatedResponse<TranslationListItem>> {
  const response = await apiClient.get<PaginatedResponse<TranslationListItem>>(
    `/games/${gamekey}/translations?page=${page}&page_size=${pageSize}`
  );
  return response.data;
}

/**
 * Hook to fetch translations for a specific game.
 */
export function useGameTranslations(
  gamekey: number,
  page: number = 1,
  pageSize: number = 50
) {
  return useQuery({
    queryKey: ["games", gamekey, "translations", { page, pageSize }],
    queryFn: () => fetchGameTranslations(gamekey, page, pageSize),
    enabled: !!gamekey,
  });
}
