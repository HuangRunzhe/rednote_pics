# RedNote App Launcher (PowerShell Version)
# 小红书笔记出图应用启动器

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    小红书笔记出图应用启动器" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Python detected: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Python not detected, please install Python 3.7+" -ForegroundColor Red
    Write-Host "Download: https://www.python.org/downloads/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if Node.js is installed
try {
    $nodeVersion = node --version 2>&1
    Write-Host "✅ Node.js detected: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Node.js not detected, please install Node.js" -ForegroundColor Red
    Write-Host "Download: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Environment check passed" -ForegroundColor Green
Write-Host ""

# Install Python dependencies
Write-Host "📦 Installing Python dependencies..." -ForegroundColor Yellow
try {
    pip install -r requirements.txt
    Write-Host "✅ Python dependencies installed successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install Python dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

# Start backend service
Write-Host "🚀 Starting backend service..." -ForegroundColor Yellow
Start-Process -FilePath "cmd" -ArgumentList "/k", "cd backend && python main.py" -WindowStyle Normal
Write-Host "✅ Backend service started (Port: 8000)" -ForegroundColor Green
Write-Host ""

# Wait for backend to start
Write-Host "⏳ Waiting for backend service to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Test backend connection
Write-Host "🔍 Testing backend connection..." -ForegroundColor Yellow
try {
    python test_api.py
} catch {
    Write-Host "⚠️  Backend connection test failed, but continuing with frontend..." -ForegroundColor Yellow
}
Write-Host ""

# Install frontend dependencies
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location frontend
try {
    npm install
    Write-Host "✅ Frontend dependencies installed successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

# Start frontend service
Write-Host "🚀 Starting frontend service..." -ForegroundColor Yellow
Start-Process -FilePath "cmd" -ArgumentList "/k", "npm start" -WindowStyle Normal
Write-Host "✅ Frontend service started (Port: 3000)" -ForegroundColor Green
Write-Host ""

# Wait for frontend to start
Write-Host "⏳ Waiting for frontend service to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "           🎉 Launch Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host "🔧 Backend:  http://localhost:8000" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Usage Guide:" -ForegroundColor Cyan
Write-Host "   1. Enter text in the input box" -ForegroundColor White
Write-Host "   2. Click 'Generate Note' button" -ForegroundColor White
Write-Host "   3. View the generated note card" -ForegroundColor White
Write-Host "   4. Click 'Save Image' to download" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Notes:" -ForegroundColor Yellow
Write-Host "   - Ensure network connection is stable" -ForegroundColor White
Write-Host "   - First run may take time to download dependencies" -ForegroundColor White
Write-Host "   - Check console for error messages if issues occur" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit launcher" 