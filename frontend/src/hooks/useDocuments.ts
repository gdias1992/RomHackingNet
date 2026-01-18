import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import type {
  DocumentDetail,
  DocumentListItem,
  DocumentQueryParams,
  PaginatedResponse,
} from "@/api/types";

/**
 * Build query string from params object.
 */
function buildQueryString(params: DocumentQueryParams): string {
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
 * Fetches paginated documents from the API.
 */
async function fetchDocuments(
  params: DocumentQueryParams
): Promise<PaginatedResponse<DocumentListItem>> {
  const response = await apiClient.get<PaginatedResponse<DocumentListItem>>(
    `/documents${buildQueryString(params)}`
  );
  return response.data;
}

type DocumentsQueryOptions = Omit<
  UseQueryOptions<PaginatedResponse<DocumentListItem>>,
  "queryKey" | "queryFn"
>;

/**
 * Hook to fetch paginated documents with filters.
 */
export function useDocuments(
  params: DocumentQueryParams = {},
  options?: DocumentsQueryOptions
) {
  return useQuery({
    queryKey: ["documents", params],
    queryFn: () => fetchDocuments(params),
    ...options,
  });
}

/**
 * Fetches a single document by ID.
 */
async function fetchDocument(dockey: number): Promise<DocumentDetail> {
  const response = await apiClient.get<DocumentDetail>(`/documents/${dockey}`);
  return response.data;
}

/**
 * Hook to fetch a single document with details.
 */
export function useDocument(dockey: number) {
  return useQuery({
    queryKey: ["documents", dockey],
    queryFn: () => fetchDocument(dockey),
    enabled: !!dockey,
  });
}
