# RomHacking.net Archive Explorer Startup Script

$RootPath = $PSScriptRoot
if (-not $RootPath) { $RootPath = Get-Location }

# Paths
$BackendPath = Join-Path $RootPath "backend"
$FrontendPath = Join-Path $RootPath "frontend"
$VenvPath = Join-Path $RootPath ".venv"
$ActivateScript = Join-Path $VenvPath "Scripts\Activate.ps1"

Write-Host "🚀 Starting RomHacking.net Archive Explorer..." -ForegroundColor Cyan

# Check for .venv
if (-not (Test-Path $ActivateScript)) {
    Write-Host "❌ Error: Virtual environment not found at $VenvPath" -ForegroundColor Red
    Write-Host "Please ensure you have followed the installation steps in README.md" -ForegroundColor Gray
    exit 1
}

# Start Backend
Write-Host "📦 Starting Backend (API)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$Host.UI.RawUI.WindowTitle = 'Backend - RomHackingNet'; cd '$BackendPath'; & '$ActivateScript'; uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

# Start Frontend
Write-Host "🎨 Starting Frontend (Vite)..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$Host.UI.RawUI.WindowTitle = 'Frontend - RomHackingNet'; cd '$FrontendPath'; npm.cmd run dev"

Write-Host ""
Write-Host "✅ Both services are launching in separate windows." -ForegroundColor Yellow
Write-Host "   - API Root:     http://127.0.0.1:8000" -ForegroundColor Gray
Write-Host "   - Swagger Docs: http://127.0.0.1:8000/docs" -ForegroundColor Gray
Write-Host "   - Application:  http://localhost:5173" -ForegroundColor Gray
Write-Host ""
