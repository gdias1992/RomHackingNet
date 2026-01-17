/**
 * Health check response from the API.
 */
export interface HealthResponse {
  status: "healthy" | "degraded";
  version: string;
  database: "connected" | "disconnected" | "error";
}

/**
 * Generic paginated response wrapper.
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Generic message response.
 */
export interface MessageResponse {
  message: string;
}
