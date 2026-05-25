@echo off
REM publish.cmd — Windows wrapper for publish:cards
REM Usage: cd sns-publisher && npm run publish:cards <slug> [-- --dry-run|--threads-only|--linkedin-only|--force]
REM
REM npm forwards positional + extra-after-`--` args via %*.
node "%~dp0scripts\index.js" %*
