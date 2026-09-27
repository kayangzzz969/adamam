@echo off
title Autobot Fanbase Local Server
cd /d "%~dp0"
echo ===================================================
echo   Menjalankan Autobot Fanbase Server...
echo   Membuka http://localhost:8080/admin.html
echo ===================================================
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
