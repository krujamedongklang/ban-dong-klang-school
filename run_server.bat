@echo off
title School Website Server (Ban Dong Klang)
echo ==========================================================
echo       School Website Server (Ban Dong Klang School)
echo ==========================================================
echo.
echo Starting local web server...
echo.
echo >>> Please open this link in your web browser:
echo     http://localhost:3000
echo.
echo ----------------------------------------------------------
echo >>> To STOP the server, press [Ctrl + C] or close this window.
echo ----------------------------------------------------------
echo.
python -m http.server 3000
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Port 3000 might be in use. Trying port 3001 instead...
    echo.
    echo >>> Please open this link instead:
    echo     http://localhost:3001
    echo.
    python -m http.server 3001
)
pause
