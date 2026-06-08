$root = $PSScriptRoot

Write-Host "Starting backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\kanban-backend'; npm run dev"

Write-Host "Starting frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\client'; npm run dev"

Write-Host ""
Write-Host "Both servers running:" -ForegroundColor Green
Write-Host "  Frontend -> http://localhost:5173" -ForegroundColor Yellow
Write-Host "  Backend  -> http://localhost:3001" -ForegroundColor Yellow
