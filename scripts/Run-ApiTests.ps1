<#
.SYNOPSIS
    Run API tests for the RomHacking.net Archive Explorer.

.DESCRIPTION
    This script activates the Python virtual environment and runs the API test suite.
    Make sure the backend server is running before executing this script.

.PARAMETER Verbose
    Show response previews for each test.

.PARAMETER BaseUrl
    Override the default API base URL.

.EXAMPLE
    .\scripts\Run-ApiTests.ps1
    
.EXAMPLE
    .\scripts\Run-ApiTests.ps1 -Verbose
    
.EXAMPLE
    .\scripts\Run-ApiTests.ps1 -BaseUrl "http://localhost:8080/api/v1"
#>

[CmdletBinding()]
param(
    [switch]$VerboseOutput,
    [string]$BaseUrl = "http://127.0.0.1:8000/api/v1"
)

$ErrorActionPreference = "Stop"

# Get the repository root
$RepoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$VenvPath = Join-Path $RepoRoot ".venv"
$ActivateScript = Join-Path $VenvPath "Scripts\Activate.ps1"
$TestScript = Join-Path $RepoRoot "scripts\test_api.py"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RomHacking.net API Test Runner" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if virtual environment exists
if (-not (Test-Path $ActivateScript)) {
    Write-Host "❌ Virtual environment not found at: $VenvPath" -ForegroundColor Red
    Write-Host "   Please create it first: python -m venv .venv" -ForegroundColor Yellow
    exit 1
}

# Check if test script exists
if (-not (Test-Path $TestScript)) {
    Write-Host "❌ Test script not found at: $TestScript" -ForegroundColor Red
    exit 1
}

# Activate virtual environment
Write-Host "🔧 Activating virtual environment..." -ForegroundColor Gray
& $ActivateScript

# Check if requests is installed
$RequestsInstalled = python -c "import requests" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "📦 Installing requests package..." -ForegroundColor Yellow
    pip install requests --quiet
}

# Build arguments
$Arguments = @("--base-url", $BaseUrl)
if ($VerboseOutput) {
    $Arguments += "--verbose"
}

# Run the test script
Write-Host "🧪 Running API tests..." -ForegroundColor Green
Write-Host ""

python $TestScript @Arguments
$TestExitCode = $LASTEXITCODE

Write-Host ""
if ($TestExitCode -eq 0) {
    Write-Host "✅ All tests passed!" -ForegroundColor Green
} else {
    Write-Host "❌ Some tests failed!" -ForegroundColor Red
}

exit $TestExitCode
