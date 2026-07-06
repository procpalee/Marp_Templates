@echo off
chcp 65001 >nul
REM ============================================================
REM  썸네일 렌더 — .thumb.md 파일을 이 파일 위에 드래그&드롭
REM  <이름>.thumb.md  ->  같은 폴더에 <이름>.png 생성 후 열기
REM ============================================================
setlocal
set "SRC=%~1"
if "%SRC%"=="" (
  echo .thumb.md 파일을 이 파일 위에 드래그^&드롭 하세요.
  pause
  exit /b 1
)
set "OUT=%~dpn1.png"
set "OUT=%OUT:.thumb=%"
cd /d "%~dp0..\build"
echo [렌더 중] %SRC%
call npx --yes @marp-team/marp-cli "%SRC%" --image png --allow-local-files --theme-set ..\themes\thumbnail\procpa-vivid -o "%OUT%"
if errorlevel 1 (
  echo.
  echo [실패] 위 오류 메시지를 확인하세요.
  pause
) else (
  echo [완료] %OUT%
  start "" "%OUT%"
)
endlocal
