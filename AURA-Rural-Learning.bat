@echo off
title AURA-Learn Platform Launcher
:: Detect browser - prefer Chrome if installed, fall back to Microsoft Edge (always present on Windows)
where chrome >nul 2>nul
if %errorlevel% equ 0 (
    echo Launching AURA-Learn in Standalone App Mode via Google Chrome...
    start chrome --app="%~dp0index.html" --window-size=1200,800
) else (
    echo Google Chrome not detected. Launching via Microsoft Edge App Mode...
    start msedge --app="%~dp0index.html" --window-size=1200,800
)
exit
