@echo off
setlocal

if not exist output mkdir output

for %%t in (01-minimal-light 02-modern-dark 03-academic-editorial 04-vivid-gradient 05-warm-paper 06-procpa 07-tech-modern) do (
  echo Building %%t...
  call npx --yes @marp-team/marp-cli --no-stdin slides-%%t.md --html --allow-local-files -o output\%%t.html --theme-set themes
)

echo Building obsidian-pkm...
call npx --yes @marp-team/marp-cli --no-stdin slides-obsidian-pkm.md --html --allow-local-files -o output\obsidian-pkm-new.html --theme-set themes

if not exist output\themes mkdir output\themes
copy /Y themes\*.png output\themes\

echo.
echo Done. Open output\index.html to compare.
endlocal
