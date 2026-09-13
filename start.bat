@echo off
echo ========================================================
echo Starting MEDSCAN AI - Smart Medication Platform
echo ========================================================
echo.
start http://localhost:5173
npm run dev -- --host
pause

