import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import type {
  PaginatedResponse,
  TranslationDetail,
  TranslationImage,
  TranslationListItem,
  TranslationQueryParams,
} from "@/api/types";

/**
 * Build query string from params object.
 */
function buildQueryString(params: TranslationQueryParams): string {
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
 * Fetches paginated translations from the API.
 */
async function fetchTranslations(
  params: TranslationQueryParams
): Promise<PaginatedResponse<TranslationListItem>> {
  const response = await apiClient.get<PaginatedResponse<TranslationListItem>>(
    `/translations${buildQueryString(params)}`
  );
  return response.data;
}

type TranslationsQueryOptions = Omit<
  UseQueryOptions<PaginatedResponse<TranslationListItem>>,
  "queryKey" | "queryFn"
>;

/**
 * Hook to fetch paginated translations with filters.
 */
export function useTranslations(params: TranslationQueryParams = {}, options?: TranslationsQueryOptions) {
  return useQuery({
    queryKey: ["translations", params],
    queryFn: () => fetchTranslations(params),
    ...options,
  });
}

/**
 * Fetches a single translation by ID.
 */
async function fetchTranslation(transkey: number): Promise<TranslationDetail> {
  const response = await apiClient.get<TranslationDetail>(`/translations/${transkey}`);
  return response.data;
}

/**
 * Hook to fetch a single translation with details.
 */
export function useTranslation(transkey: number) {
  return useQuery({
    queryKey: ["translations", transkey],
    queryFn: () => fetchTranslation(transkey),
    enabled: !!transkey,
  });
}

/**
 * Fetches images for a specific translation.
 */
async function fetchTranslationImages(transkey: number): Promise<TranslationImage[]> {
  const response = await apiClient.get<TranslationImage[]>(
    `/translations/${transkey}/images`
  );
  return response.data;
}

/**
 * Hook to fetch images for a specific translation.
 */
export function useTranslationImages(transkey: number) {
  return useQuery({
    queryKey: ["translations", transkey, "images"],
    queryFn: () => fetchTranslationImages(transkey),
    enabled: !!transkey,
  });
}
