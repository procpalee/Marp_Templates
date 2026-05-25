@echo off
setlocal
set THEME=%~1
set FORMAT=%~2
if "%THEME%"=="" set THEME=tech-modern
if "%FORMAT%"=="" set FORMAT=slide

if /i "%FORMAT%"=="card-news" (
  call npx --yes @marp-team/marp-cli ^
    ..\themes\card-news\%THEME%\sample.md ^
    --html --allow-local-files ^
    --theme-set ..\themes\card-news\%THEME% ^
    -o ..\themes\card-news\%THEME%\sample.html
) else (
  call npx --yes @marp-team/marp-cli ^
    ..\themes\slide\%THEME%\slides\%THEME%.md ^
    --html --allow-local-files ^
    --theme-set ..\themes\slide ^
    -o ..\themes\slide\%THEME%\slides\%THEME%.html
)
endlocal
