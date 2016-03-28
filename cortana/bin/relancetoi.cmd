TIMEOUT /T 10 /NOBREAK
TASKKILL /F /T /IM "WSRMacro.exe"

cd c:/sarah
start %cd%\bin\WSRMacro.exe

cd c:/sarah/plugins/programs/bin
start node.cmd

TASKKILL /F /IM "node.exe"
exit
