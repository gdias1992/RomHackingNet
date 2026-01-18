/**
 * API type definitions for the RomHacking.net Archive Explorer.
 */

// =============================================================================
// Common Types
// =============================================================================

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
  page_size: number;
  total_pages: number;
}

/**
 * Generic message response.
 */
export interface MessageResponse {
  message: string;
}

// =============================================================================
// Metadata/Lookup Types
// =============================================================================

export interface Console {
  consoleid: number;
  description: string;
  manufacturer: string | null;
  abb: string | null;
}

export interface Genre {
  genreid: number;
  description: string;
}

export interface Language {
  languageid: number;
  description: string;
}

export interface PatchStatus {
  statusid: number;
  description: string;
}

export interface Category {
  categoryid: number;
  description: string;
}

export interface HackCategory {
  categoryid: number;
  description: string;
}

export interface HomebrewCategory {
  categoryid: number;
  description: string;
}

export interface UtilCategory {
  categoryid: number;
  description: string;
}

export interface SkillLevel {
  levelid: number;
  description: string;
}

export interface OperatingSystem {
  osid: number;
  description: string;
}

export interface AllMetadata {
  consoles: Console[];
  genres: Genre[];
  languages: Language[];
  patch_statuses: PatchStatus[];
  hack_categories: HackCategory[];
  util_categories: UtilCategory[];
  doc_categories: Category[];
  homebrew_categories: HomebrewCategory[];
  skill_levels: SkillLevel[];
  operating_systems: OperatingSystem[];
}

// =============================================================================
// Game Types
// =============================================================================

export interface GameListItem {
  gamekey: number;
  gametitle: string;
  japtitle: string | null;
  publisher: string | null;
  platformid: number | null;
  genreid: number | null;
  platform_name: string | null;
  genre_name: string | null;
  transexist: number;
  hackexist: number;
  utilexist: number;
  docexist: number;
}

export interface GameDetail extends GameListItem {
  hack_count: number;
  translation_count: number;
  utility_count: number;
  document_count: number;
}

export interface GameQueryParams {
  q?: string;
  platform?: number;
  genre?: number;
  has_hacks?: boolean;
  has_translations?: boolean;
  page?: number;
  page_size?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

// =============================================================================
// Hack Types
// =============================================================================

export interface HackListItem {
  hackkey: number;
  hacktitle: string;
  version: string | null;
  description: string | null;
  gamekey: number | null;
  consolekey: number | null;
  category: number | null;
  game_title: string | null;
  console_name: string | null;
  category_name: string | null;
  downloads: number;
  releasedate: string | null;
  created: string | null;
  lastmod: string | null;
}

export interface HackDetail extends HackListItem {
  authorkey: number | null;
  filename: string | null;
  filesize: number | null;
  patchtype: string | null;
  hintskey: number | null;
  patch_hint: string | null;
  nofile: number;
  noreadme: number;
  image_count: number;
}

export interface HackImage {
  imageid: number;
  filename: string;
  caption: string | null;
}

export interface HackQueryParams {
  q?: string;
  game?: number;
  console?: number;
  category?: number;
  page?: number;
  page_size?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

// =============================================================================
// Translation Types
// =============================================================================

export interface TranslationListItem {
  transkey: number;
  version: string | null;
  description: string | null;
  gamekey: number | null;
  consolekey: number | null;
  language: number | null;
  patchstatus: number | null;
  game_title: string | null;
  console_name: string | null;
  language_name: string | null;
  status_name: string | null;
  downloads: number;
  releasedate: string | null;
  created: string | null;
  lastmod: string | null;
}

export interface TranslationDetail extends TranslationListItem {
  groupkey: number | null;
  filename: string | null;
  filesize: number | null;
  patchtype: string | null;
  hintskey: number | null;
  patch_hint: string | null;
  nofile: number;
  noreadme: number;
  image_count: number;
}

export interface TranslationImage {
  imageid: number;
  filename: string;
  caption: string | null;
}

export interface TranslationQueryParams {
  q?: string;
  game?: number;
  console?: number;
  language?: number;
  status?: number;
  page?: number;
  page_size?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

// =============================================================================
// Utility Types
// =============================================================================

export interface UtilityListItem {
  utilkey: number;
  title: string;
  version: string | null;
  description: string | null;
  categorykey: number | null;
  consolekey: number | null;
  gamekey: number | null;
  os: number | null;
  category_name: string | null;
  console_name: string | null;
  game_title: string | null;
  os_name: string | null;
  downloads: number;
  reldate: number | null;
  created: string | null;
  lastmod: string | null;
}

export interface UtilityDetail extends UtilityListItem {
  authorkey: number | null;
  license: string | null;
  source: string | null;
  filename: string | null;
  nofile: number;
}

export interface UtilityQueryParams {
  q?: string;
  category?: number;
  console?: number;
  os?: number;
  page?: number;
  page_size?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

// =============================================================================
// Document Types
// =============================================================================

export interface DocumentListItem {
  dockey: number;
  title: string;
  description: string | null;
  categorykey: number | null;
  consolekey: number | null;
  gamekey: number | null;
  explevel: number | null;
  category_name: string | null;
  console_name: string | null;
  game_title: string | null;
  skill_level: string | null;
  downloads: number;
  created: string | null;
  lastmod: string | null;
}

export interface DocumentDetail extends DocumentListItem {
  authorkey: number | null;
  version: string | null;
  filename: string | null;
  reldate: number | null;
  nofile: number;
}

export interface DocumentQueryParams {
  q?: string;
  category?: number;
  console?: number;
  skill_level?: number;
  page?: number;
  page_size?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

// =============================================================================
// Homebrew Types
// =============================================================================

export interface HomebrewListItem {
  homebrewkey: number;
  title: string;
  version: string | null;
  description: string | null;
  categorykey: number | null;
  platformkey: number | null;
  category_name: string | null;
  platform_name: string | null;
  downloads: number;
  reldate: string | null;
  created: string | null;
  lastmod: string | null;
}

export interface HomebrewDetail extends HomebrewListItem {
  authorkey: number | null;
  filename: string | null;
  titlescreen: string | null;
  readme: string | null;
  nofile: number;
  noreadme: number;
}

export interface HomebrewQueryParams {
  q?: string;
  category?: number;
  platform?: number;
  page?: number;
  page_size?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

