@echo off
chcp 65001 > nul
title RedNote App Launcher

echo.
echo ========================================
echo        RedNote App Launcher
echo ========================================
echo.

:: Check if Python is installed
python --version > nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not detected, please install Python 3.7+
    echo Download: https://www.python.org/downloads/
    pause
    exit /b 1
)

:: Check if Node.js is installed
node --version > nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not detected, please install Node.js
    echo Download: https://nodejs.org/
    pause
    exit /b 1
)

echo Environment check passed
echo.

:: Install Python dependencies
echo Installing Python dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)
echo Python dependencies installed successfully
echo.

:: Start backend service
echo Starting backend service...
start "Backend Service" cmd /k "cd backend && python main.py"
echo Backend service started (Port: 8000)
echo.

:: Wait for backend to start
echo Waiting for backend service to start...
timeout /t 5 /nobreak > nul

:: Test backend connection
echo Testing backend connection...
python test_api.py
if errorlevel 1 (
    echo WARNING: Backend connection test failed, but continuing with frontend...
    echo.
)

:: Install frontend dependencies
echo Installing frontend dependencies...
cd frontend
npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
echo Frontend dependencies installed successfully
echo.

:: Start frontend service
echo Starting frontend service...
start "Frontend Service" cmd /k "npm start"
echo Frontend service started (Port: 3000)
echo.

:: Wait for frontend to start
echo Waiting for frontend service to start...
timeout /t 10 /nobreak > nul

echo.
echo ========================================
echo           Launch Complete!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8000
echo.
echo Usage Guide:
echo    1. Enter text in the input box
echo    2. Click "Generate Note" button
echo    3. View the generated note card
echo    4. Click "Save Image" to download
echo.
echo Notes:
echo    - Ensure network connection is stable
echo    - First run may take time to download dependencies
echo    - Check console for error messages if issues occur
echo.
echo Press any key to exit launcher...
pause > nul 