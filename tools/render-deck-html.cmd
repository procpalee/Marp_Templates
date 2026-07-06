@echo off
chcp 65001 >nul
REM ============================================================
REM  슬라이드 덱 렌더 — 변환된 슬라이드 .md를 드래그&드롭
REM  <이름>.md  ->  같은 폴더에 <이름>.html 생성 후 브라우저로 열기
REM  (테마는 front matter의 theme: 값으로 자동 선택 — slide/card/thumb 전부 인식)
REM ============================================================
setlocal
set "SRC=%~1"
if "%SRC%"=="" (
  echo 슬라이드 .md 파일을 이 파일 위에 드래그^&드롭 하세요.
  pause
  exit /b 1
)
set "OUT=%~dpn1.html"
cd /d "%~dp0..\build"
echo [렌더 중] %SRC%
call npx --yes @marp-team/marp-cli "%SRC%" --html --allow-local-files --theme-set ..\themes -o "%OUT%"
if errorlevel 1 (
  echo.
  echo [실패] 위 오류 메시지를 확인하세요.
  pause
) else (
  echo [완료] %OUT%
  start "" "%OUT%"
)
endlocal
