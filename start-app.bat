@echo off
echo Starting Chat-Based Clothing Inventory System...

:: Start Backend
start "Backend Server" cmd /k "cd backend && node server.js"

:: Start Frontend
start "Frontend App" cmd /k "cd frontend && npm run dev"

echo ===================================================
echo Application is running!
echo Access the App:
echo   - Admin Dashboard: http://localhost:3000/admin
echo   - Chat Interface:  http://localhost:3000/chat
echo   - API Server:      http://localhost:3001
echo ===================================================
pause
