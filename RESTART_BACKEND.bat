@echo off
echo ========================================
echo Restarting Healthcare Dashboard Backend
echo ========================================
echo.

echo Stopping any running Python processes...
taskkill /F /IM python.exe 2>nul
timeout /t 2 /nobreak >nul

echo.
echo Starting backend server on port 5000...
cd /d "%~dp0backend"
python main.py

pause
