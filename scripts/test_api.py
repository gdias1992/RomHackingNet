#!/usr/bin/env python3
"""
API Test Script for RomHacking.net Archive Explorer

This script tests all backend API endpoints to verify they are functioning correctly.
Run this after starting the backend server with:
    uvicorn main:app --host 127.0.0.1 --port 8000

Usage:
    python scripts/test_api.py [--base-url URL] [--verbose]
"""

import argparse
import json
import sys
import time
from dataclasses import dataclass
from typing import Any

import requests
from requests.exceptions import ConnectionError, RequestException


@dataclass
class TestResult:
    """Result of a single API test."""

    name: str
    endpoint: str
    method: str
    passed: bool
    status_code: int | None
    response_time_ms: float
    error: str | None = None
    response_preview: str | None = None


class APITester:
    """Test runner for the RomHacking.net API."""

    def __init__(self, base_url: str, verbose: bool = False):
        self.base_url = base_url.rstrip("/")
        self.verbose = verbose
        self.results: list[TestResult] = []
        self.session = requests.Session()

        # Store IDs discovered during testing for chained tests
        self.discovered_ids: dict[str, int | None] = {
            "game_id": None,
            "hack_id": None,
            "translation_id": None,
            "utility_id": None,
            "document_id": None,
            "homebrew_id": None,
        }

    def _make_request(
        self,
        method: str,
        endpoint: str,
        params: dict[str, Any] | None = None,
        json_data: dict[str, Any] | None = None,
    ) -> tuple[requests.Response | None, float, str | None]:
        """Make an HTTP request and return response, time, and error if any."""
        url = f"{self.base_url}{endpoint}"

        try:
            start = time.perf_counter()
            response = self.session.request(
                method=method,
                url=url,
                params=params,
                json=json_data,
                timeout=30,
            )
            elapsed_ms = (time.perf_counter() - start) * 1000
            return response, elapsed_ms, None
        except ConnectionError:
            return None, 0, "Connection refused - is the server running?"
        except RequestException as e:
            return None, 0, str(e)

    def _format_response_preview(self, response: requests.Response, max_length: int = 200) -> str:
        """Format a preview of the response body."""
        try:
            data = response.json()
            preview = json.dumps(data, indent=2)
            if len(preview) > max_length:
                return preview[:max_length] + "..."
            return preview
        except json.JSONDecodeError:
            text = response.text
            if len(text) > max_length:
                return text[:max_length] + "..."
            return text

    def test_endpoint(
        self,
        name: str,
        endpoint: str,
        method: str = "GET",
        params: dict[str, Any] | None = None,
        json_data: dict[str, Any] | None = None,
        expected_status: int = 200,
        extract_id: str | None = None,
    ) -> TestResult:
        """Test a single API endpoint."""
        response, elapsed_ms, error = self._make_request(method, endpoint, params, json_data)

        if error:
            result = TestResult(
                name=name,
                endpoint=endpoint,
                method=method,
                passed=False,
                status_code=None,
                response_time_ms=elapsed_ms,
                error=error,
            )
        else:
            passed = response.status_code == expected_status
            preview = self._format_response_preview(response) if self.verbose else None

            # Extract ID from response if requested
            if extract_id and passed:
                try:
                    data = response.json()
                    if "items" in data and len(data["items"]) > 0:
                        # Get first item's key from list response
                        first_item = data["items"][0]
                        id_key = next(
                            (k for k in first_item if k.endswith("key")),
                            None,
                        )
                        if id_key:
                            self.discovered_ids[extract_id] = first_item[id_key]
                except (json.JSONDecodeError, KeyError, IndexError):
                    pass

            result = TestResult(
                name=name,
                endpoint=endpoint,
                method=method,
                passed=passed,
                status_code=response.status_code,
                response_time_ms=elapsed_ms,
                response_preview=preview,
            )

        self.results.append(result)
        return result

    def run_all_tests(self) -> None:
        """Run all API tests."""
        print("\n" + "=" * 60)
        print("🧪 RomHacking.net API Test Suite")
        print("=" * 60)
        print(f"📍 Base URL: {self.base_url}")
        print(f"🔍 Verbose: {self.verbose}")
        print("=" * 60 + "\n")

        # Health Check
        self._run_health_tests()

        # Metadata Tests
        self._run_metadata_tests()

        # Games Tests
        self._run_games_tests()

        # Hacks Tests
        self._run_hacks_tests()

        # Translations Tests
        self._run_translations_tests()

        # Utilities Tests
        self._run_utilities_tests()

        # Documents Tests
        self._run_documents_tests()

        # Homebrew Tests
        self._run_homebrew_tests()

        # Logging Tests
        self._run_logging_tests()

        # Print Summary
        self._print_summary()

    def _run_health_tests(self) -> None:
        """Run health check tests."""
        self._print_section("Health Check")
        self._run_test("Health Check", "/health")

    def _run_metadata_tests(self) -> None:
        """Run metadata endpoint tests."""
        self._print_section("Metadata Endpoints")

        self._run_test("Get All Metadata", "/metadata")
        self._run_test("Get Consoles", "/metadata/consoles")
        self._run_test("Get Genres", "/metadata/genres")
        self._run_test("Get Languages", "/metadata/languages")
        self._run_test("Get Patch Statuses", "/metadata/patch-statuses")
        self._run_test("Get Hack Categories", "/metadata/categories/hacks")
        self._run_test("Get Utility Categories", "/metadata/categories/utilities")
        self._run_test("Get Document Categories", "/metadata/categories/documents")
        self._run_test("Get Homebrew Categories", "/metadata/categories/homebrew")
        self._run_test("Get Skill Levels", "/metadata/skill-levels")
        self._run_test("Get Operating Systems", "/metadata/operating-systems")

    def _run_games_tests(self) -> None:
        """Run games endpoint tests."""
        self._print_section("Games Endpoints")

        # List games and extract an ID for detail tests
        self._run_test(
            "List Games",
            "/games",
            params={"page": 1, "page_size": 10},
            extract_id="game_id",
        )

        # Test with filters
        self._run_test(
            "List Games (with search)",
            "/games",
            params={"q": "mario", "page": 1, "page_size": 10},
        )
        self._run_test(
            "List Games (with platform filter)",
            "/games",
            params={"platform": 1, "page": 1, "page_size": 10},
        )
        self._run_test(
            "List Games (with has_hacks filter)",
            "/games",
            params={"has_hacks": True, "page": 1, "page_size": 10},
        )

        # Detail tests using discovered ID
        game_id = self.discovered_ids.get("game_id")
        if game_id:
            self._run_test(
                "Get Game Details",
                f"/games/{game_id}",
            )
            self._run_test(
                "Get Game Hacks",
                f"/games/{game_id}/hacks",
                params={"page": 1, "page_size": 10},
            )
            self._run_test(
                "Get Game Translations",
                f"/games/{game_id}/translations",
                params={"page": 1, "page_size": 10},
            )
        else:
            print("  ⚠️  Skipping game detail tests (no game ID found)")

    def _run_hacks_tests(self) -> None:
        """Run hacks endpoint tests."""
        self._print_section("Hacks Endpoints")

        # List hacks and extract an ID
        self._run_test(
            "List Hacks",
            "/hacks",
            params={"page": 1, "page_size": 10},
            extract_id="hack_id",
        )

        # Test with filters
        self._run_test(
            "List Hacks (with search)",
            "/hacks",
            params={"q": "kaizo", "page": 1, "page_size": 10},
        )
        self._run_test(
            "List Hacks (with console filter)",
            "/hacks",
            params={"console": 1, "page": 1, "page_size": 10},
        )
        self._run_test(
            "List Hacks (with category filter)",
            "/hacks",
            params={"category": 1, "page": 1, "page_size": 10},
        )

        # Detail tests
        hack_id = self.discovered_ids.get("hack_id")
        if hack_id:
            self._run_test(
                "Get Hack Details",
                f"/hacks/{hack_id}",
            )
            self._run_test(
                "Get Hack Images",
                f"/hacks/{hack_id}/images",
            )
        else:
            print("  ⚠️  Skipping hack detail tests (no hack ID found)")

    def _run_translations_tests(self) -> None:
        """Run translations endpoint tests."""
        self._print_section("Translations Endpoints")

        # List translations and extract an ID
        self._run_test(
            "List Translations",
            "/translations",
            params={"page": 1, "page_size": 10},
            extract_id="translation_id",
        )

        # Test with filters
        self._run_test(
            "List Translations (with search)",
            "/translations",
            params={"q": "final fantasy", "page": 1, "page_size": 10},
        )
        self._run_test(
            "List Translations (with language filter)",
            "/translations",
            params={"language": 1, "page": 1, "page_size": 10},
        )
        self._run_test(
            "List Translations (with status filter)",
            "/translations",
            params={"status": 1, "page": 1, "page_size": 10},
        )

        # Detail tests
        trans_id = self.discovered_ids.get("translation_id")
        if trans_id:
            self._run_test(
                "Get Translation Details",
                f"/translations/{trans_id}",
            )
            self._run_test(
                "Get Translation Images",
                f"/translations/{trans_id}/images",
            )
        else:
            print("  ⚠️  Skipping translation detail tests (no translation ID found)")

    def _run_utilities_tests(self) -> None:
        """Run utilities endpoint tests."""
        self._print_section("Utilities Endpoints")

        # List utilities and extract an ID
        self._run_test(
            "List Utilities",
            "/utilities",
            params={"page": 1, "page_size": 10},
            extract_id="utility_id",
        )

        # Test with filters
        self._run_test(
            "List Utilities (with search)",
            "/utilities",
            params={"q": "editor", "page": 1, "page_size": 10},
        )
        self._run_test(
            "List Utilities (with category filter)",
            "/utilities",
            params={"category": 1, "page": 1, "page_size": 10},
        )
        self._run_test(
            "List Utilities (with console filter)",
            "/utilities",
            params={"console": 1, "page": 1, "page_size": 10},
        )

        # Detail tests
        util_id = self.discovered_ids.get("utility_id")
        if util_id:
            self._run_test(
                "Get Utility Details",
                f"/utilities/{util_id}",
            )
        else:
            print("  ⚠️  Skipping utility detail tests (no utility ID found)")

    def _run_documents_tests(self) -> None:
        """Run documents endpoint tests."""
        self._print_section("Documents Endpoints")

        # List documents and extract an ID
        self._run_test(
            "List Documents",
            "/documents",
            params={"page": 1, "page_size": 10},
            extract_id="document_id",
        )

        # Test with filters
        self._run_test(
            "List Documents (with search)",
            "/documents",
            params={"q": "guide", "page": 1, "page_size": 10},
        )
        self._run_test(
            "List Documents (with category filter)",
            "/documents",
            params={"category": 1, "page": 1, "page_size": 10},
        )
        self._run_test(
            "List Documents (with skill_level filter)",
            "/documents",
            params={"skill_level": 1, "page": 1, "page_size": 10},
        )

        # Detail tests
        doc_id = self.discovered_ids.get("document_id")
        if doc_id:
            self._run_test(
                "Get Document Details",
                f"/documents/{doc_id}",
            )
        else:
            print("  ⚠️  Skipping document detail tests (no document ID found)")

    def _run_homebrew_tests(self) -> None:
        """Run homebrew endpoint tests."""
        self._print_section("Homebrew Endpoints")

        # List homebrew and extract an ID
        self._run_test(
            "List Homebrew",
            "/homebrew",
            params={"page": 1, "page_size": 10},
            extract_id="homebrew_id",
        )

        # Test with filters
        self._run_test(
            "List Homebrew (with search)",
            "/homebrew",
            params={"q": "game", "page": 1, "page_size": 10},
        )
        self._run_test(
            "List Homebrew (with category filter)",
            "/homebrew",
            params={"category": 1, "page": 1, "page_size": 10},
        )
        self._run_test(
            "List Homebrew (with platform filter)",
            "/homebrew",
            params={"platform": 1, "page": 1, "page_size": 10},
        )

        # Detail tests
        homebrew_id = self.discovered_ids.get("homebrew_id")
        if homebrew_id:
            self._run_test(
                "Get Homebrew Details",
                f"/homebrew/{homebrew_id}",
            )
        else:
            print("  ⚠️  Skipping homebrew detail tests (no homebrew ID found)")

    def _run_logging_tests(self) -> None:
        """Run logging endpoint tests."""
        self._print_section("Logging Endpoints")

        self._run_test(
            "Submit Frontend Log",
            "/logs",
            method="POST",
            json_data={
                "level": "info",
                "message": "Test log from API test script",
                "url": "/test",
                "userAgent": "APITester/1.0",
                "timestamp": "2026-01-17T10:00:00.000Z",
            },
            expected_status=201,
        )

    def _run_test(
        self,
        name: str,
        endpoint: str,
        method: str = "GET",
        params: dict[str, Any] | None = None,
        json_data: dict[str, Any] | None = None,
        expected_status: int = 200,
        extract_id: str | None = None,
    ) -> None:
        """Run a single test and print the result."""
        result = self.test_endpoint(
            name=name,
            endpoint=endpoint,
            method=method,
            params=params,
            json_data=json_data,
            expected_status=expected_status,
            extract_id=extract_id,
        )

        status_icon = "✅" if result.passed else "❌"
        status_text = f"{result.status_code}" if result.status_code else "N/A"
        time_text = f"{result.response_time_ms:.1f}ms"

        print(f"  {status_icon} {name}")
        print(f"     {result.method} {endpoint} → {status_text} ({time_text})")

        if result.error:
            print(f"     ⚠️  Error: {result.error}")

        if result.response_preview and self.verbose:
            print(f"     Response: {result.response_preview}")

        print()

    def _print_section(self, title: str) -> None:
        """Print a section header."""
        print(f"\n📁 {title}")
        print("-" * 50)

    def _print_summary(self) -> None:
        """Print test summary."""
        passed = sum(1 for r in self.results if r.passed)
        failed = sum(1 for r in self.results if not r.passed)
        total = len(self.results)

        avg_time = (
            sum(r.response_time_ms for r in self.results) / total
            if total > 0
            else 0
        )

        print("\n" + "=" * 60)
        print("📊 Test Summary")
        print("=" * 60)
        print(f"  Total Tests:  {total}")
        print(f"  ✅ Passed:    {passed}")
        print(f"  ❌ Failed:    {failed}")
        print(f"  ⏱️  Avg Time:  {avg_time:.1f}ms")
        print("=" * 60)

        if failed > 0:
            print("\n❌ Failed Tests:")
            for result in self.results:
                if not result.passed:
                    print(f"  - {result.name}: {result.error or f'Status {result.status_code}'}")

        print()

        # Return exit code
        sys.exit(0 if failed == 0 else 1)


def main() -> None:
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Test all RomHacking.net API endpoints",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "--base-url",
        default="http://127.0.0.1:8000/api/v1",
        help="Base URL for the API (default: http://127.0.0.1:8000/api/v1)",
    )
    parser.add_argument(
        "-v", "--verbose",
        action="store_true",
        help="Show response previews",
    )

    args = parser.parse_args()

    tester = APITester(base_url=args.base_url, verbose=args.verbose)
    tester.run_all_tests()


if __name__ == "__main__":
    main()
