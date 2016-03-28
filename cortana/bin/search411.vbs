Set WshShell = WScript.CreateObject("WScript.Shell")

If Wscript.Arguments(0)="undefined" then
 Wscript.Quit
End If

cmdLine2 = Wscript.Arguments(0)
For i=1 To Wscript.Arguments.Count-1
 cmdLine2 = cmdLine2 & "+" & Wscript.Arguments(i)
Next

browser = """C:\Program Files\Mozilla Firefox\firefox.exe"""


'REM recherche normale
Google1 = "http://www.t411.me/torrents/search/?search="


cmdLine2 = chr(34) & Google1 & cmdLine2 & Google2 & chr(34)
strRun = browser & " " & cmdLine2
WshShell.Run strRun,0,false
Wscript.Quit