@echo off

set /p info=update info ?
set /p branch=Welke branch? (Enter = main): 
if "%branch%"=="" set branch=main


git add .
git commit -m " %info% "
git push origin %branch%