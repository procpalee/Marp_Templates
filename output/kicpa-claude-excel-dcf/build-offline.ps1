# kicpa-claude-excel-dcf 오프라인 빌드 스크립트
# HTML + PDF를 빌드하고, HTML의 Pretendard 폰트 원격 import를 로컬(assets/pretendard.css)로 치환한다.
# 사용: 이 폴더에서  powershell -ExecutionPolicy Bypass -File .\build-offline.ps1
$ErrorActionPreference = 'Stop'
$deck   = Split-Path -Parent $MyInvocation.MyCommand.Path          # 이 덱 폴더
$repo   = (Resolve-Path "$deck\..\..").Path                        # 저장소 루트(Marp_Templates)
$md     = Join-Path $deck 'kicpa-claude-excel-dcf.md'
$themes = Join-Path $repo 'themes'
$html   = Join-Path $deck 'kicpa-claude-excel-dcf.html'
$pdf    = Join-Path $deck 'kicpa-claude-excel-dcf.pdf'

Push-Location (Join-Path $repo 'build')
try {
  npx --yes @marp-team/marp-cli $md --html --allow-local-files --no-stdin --theme-set $themes -o $html
  npx --yes @marp-team/marp-cli $md --pdf  --allow-local-files --no-stdin --theme-set $themes -o $pdf
} finally { Pop-Location }

# Pretendard 폰트: 원격 jsdelivr import -> 로컬 assets/pretendard.css
$remote = "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@latest/dist/web/variable/pretendardvariable.min.css"
$txt = [System.IO.File]::ReadAllText($html)
$txt = $txt.Replace($remote, "assets/pretendard.css")
[System.IO.File]::WriteAllText($html, $txt, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "[OK] HTML/PDF 빌드 완료 + 폰트 로컬화 (원격 의존 없음)"
