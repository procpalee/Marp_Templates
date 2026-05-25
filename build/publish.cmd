@echo off
REM publish.cmd — Windows wrapper for publish:cards
REM Usage: cd build && npm run publish:cards <slug> [-- --dry-run|--threads-only|--linkedin-only|--force]
REM
REM npm forwards positional + extra-after-`--` args via %*.
node "%~dp0scripts\publish\index.js" %*
