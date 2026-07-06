@echo off
chcp 65001 >nul
REM ============================================================
REM  실시간 미리보기 — .md를 드래그&드롭하면 미리보기 창이 뜨고,
REM  옵시디언/메모장 어디서든 저장할 때마다 자동으로 새로고침됩니다.
REM  (VS Code 없이 쓰는 라이브 프리뷰. 끝내려면 이 창을 닫으세요)
REM ============================================================
setlocal
set "SRC=%~1"
if "%SRC%"=="" (
  echo .md 파일을 이 파일 위에 드래그^&드롭 하세요.
  pause
  exit /b 1
)
cd /d "%~dp0..\build"
echo [실시간 미리보기] %SRC%
echo 저장할 때마다 자동 갱신됩니다. 종료: 이 창 닫기 (Ctrl+C)
call npx --yes @marp-team/marp-cli "%SRC%" -p -w --html --allow-local-files --theme-set ..\themes
endlocal
