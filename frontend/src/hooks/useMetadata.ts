import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import type { AllMetadata, Console, Genre, HackCategory, Language, PatchStatus } from "@/api/types";

/**
 * Fetches all metadata from the API in a single request.
 */
async function fetchAllMetadata(): Promise<AllMetadata> {
  const response = await apiClient.get<AllMetadata>("/metadata");
  return response.data;
}

/**
 * Hook to fetch all metadata for initial app load.
 * Data is cached indefinitely since lookup tables rarely change.
 */
export function useMetadata() {
  return useQuery({
    queryKey: ["metadata"],
    queryFn: fetchAllMetadata,
    staleTime: Infinity, // Never mark as stale
    gcTime: Infinity, // Never garbage collect
  });
}

/**
 * Fetches consoles from the API.
 */
async function fetchConsoles(): Promise<Console[]> {
  const response = await apiClient.get<Console[]>("/metadata/consoles");
  return response.data;
}

/**
 * Hook to fetch all consoles.
 */
export function useConsoles() {
  return useQuery({
    queryKey: ["metadata", "consoles"],
    queryFn: fetchConsoles,
    staleTime: Infinity,
  });
}

/**
 * Fetches genres from the API.
 */
async function fetchGenres(): Promise<Genre[]> {
  const response = await apiClient.get<Genre[]>("/metadata/genres");
  return response.data;
}

/**
 * Hook to fetch all genres.
 */
export function useGenres() {
  return useQuery({
    queryKey: ["metadata", "genres"],
    queryFn: fetchGenres,
    staleTime: Infinity,
  });
}

/**
 * Fetches languages from the API.
 */
async function fetchLanguages(): Promise<Language[]> {
  const response = await apiClient.get<Language[]>("/metadata/languages");
  return response.data;
}

/**
 * Hook to fetch all languages.
 */
export function useLanguages() {
  return useQuery({
    queryKey: ["metadata", "languages"],
    queryFn: fetchLanguages,
    staleTime: Infinity,
  });
}

/**
 * Fetches patch statuses from the API.
 */
async function fetchPatchStatuses(): Promise<PatchStatus[]> {
  const response = await apiClient.get<PatchStatus[]>("/metadata/patch-statuses");
  return response.data;
}

/**
 * Hook to fetch all patch statuses.
 */
export function usePatchStatuses() {
  return useQuery({
    queryKey: ["metadata", "patch-statuses"],
    queryFn: fetchPatchStatuses,
    staleTime: Infinity,
  });
}

/**
 * Fetches hack categories from the API.
 */
async function fetchHackCategories(): Promise<HackCategory[]> {
  const response = await apiClient.get<HackCategory[]>("/metadata/categories/hacks");
  return response.data;
}

/**
 * Hook to fetch all hack categories.
 */
export function useHackCategories() {
  return useQuery({
    queryKey: ["metadata", "categories", "hacks"],
    queryFn: fetchHackCategories,
    staleTime: Infinity,
  });
}
