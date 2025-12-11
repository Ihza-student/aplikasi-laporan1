@echo off
echo Starting Report Generator...
echo Please wait while the server starts.
echo The application will open in your default browser.
echo -------------------------------------------
cd /d "%~dp0"
call npm install
start http://localhost:5173
npm run dev
pause
