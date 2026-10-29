@echo off
rem Serves this folder locally so the quiz can read questions.json, then opens it.
cd /d "%~dp0"
start "" http://localhost:8000/
python -m http.server 8000
