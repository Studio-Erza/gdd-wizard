@echo off
setlocal
chcp 65001 >nul
set "PWSH=%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe"

REM Inline PowerShell; -Command string is carefully quoted for Unicode + spaces
"%PWSH%" -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ErrorActionPreference='SilentlyContinue';" ^
  "Get-ChildItem -LiteralPath '%~dp0' -Filter *.js | Unblock-File; " ^
  "Write-Host 'Unblocked all .js in %~dp0'"

endlocal
