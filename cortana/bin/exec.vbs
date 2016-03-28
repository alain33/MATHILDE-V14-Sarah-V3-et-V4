set WshShell = WScript.CreateObject("WScript.Shell")
StrExec = Wscript.Arguments(0)
'StrExec = "communaute"


Select Case StrExec
	'gestion du navigateur
	Case "newtab"
		WshShell.SendKeys "^t"
	Case "closetab"
		WshShell.SendKeys "^w"
	Case "nexttab"
		WshShell.SendKeys "^{TAB}"
	Case "previoustab"
		WshShell.SendKeys "+^{TAB}"
	Case "tab1"
		WshShell.SendKeys "^1"
	Case "tab2"
		WshShell.SendKeys "^2"
	Case "tab3"
		WshShell.SendKeys "^3"
	Case "tab4"
		WshShell.SendKeys "^4"
	Case "tab5"
		WshShell.SendKeys "^5"
	Case "tab6"
		WshShell.SendKeys "^6"
	Case "tab7"
		WshShell.SendKeys "^7"
	Case "tab8"
		WshShell.SendKeys "^8"
	Case "tab9"
		WshShell.SendKeys "^9"
	Case "down"
		WshShell.SendKeys "{DOWN}{DOWN}{DOWN}{DOWN}{DOWN}{DOWN}{DOWN}{DOWN}"
	Case "up"
		WshShell.SendKeys "{UP}{UP}{UP}{UP}{UP}{UP}{UP}{UP}"
	Case "pagedown"
		WshShell.SendKeys "{END}"
	Case "pageup"
		WshShell.SendKeys "{HOME}"

Case "esc"
		WshShell.SendKeys "{ESC}"

Case "f11"
		WshShell.SendKeys "{F11}"

	Case "previous"
		WshShell.SendKeys "%{LEFT}"
	Case "next"
		WshShell.SendKeys "%{RIGHT}"
	

	Case "tab"
		WshShell.SendKeys "{TAB}{TAB}{TAB}{TAB}"
	

	Case "ok"
		WshShell.SendKeys "{ENTER}"


		
	Case "refresh"
		WshShell.SendKeys "{F5}"
	Case "zoom"
		WshShell.SendKeys "^{+}"
	Case "zoomout"
		WshShell.SendKeys "^-"
	Case "defaultzoom"
		WshShell.SendKeys "^0"
	Case "fullscreen"
		WshShell.SendKeys "{F11}"
	'gestion des site predefini
	Case "google"
		WshShell.run ("https:")
	Case "reco"
		WshShell.run ("https://127.0.0.1:4300")

		
	Case "facebook"
		WshShell.run ("https://fr-fr.facebook.com/")
	Case "twitter"
		WshShell.run ("https://twitter.com/")
	Case "communaute"
		WshShell.run ("https://plus.google.com/u/0/communities/105964514508504667709")
	Case "lemonde"
		WshShell.run ("http://www.lemonde.fr/")
	Case "lebienpublic"
		WshShell.run ("http://www.bienpublic.com/")
	Case "korben"
		WshShell.run ("http://korben.info/")
	Case "01net"
		WshShell.run ("http://www.01net.com/rub/actualites/10001/")	
	'gestion des web tv
	Case "bfm"
		WshShell.run ("http://www.bfmtv.com/video/bfmtv/direct/")
	Case "tf1"
		WshShell.run ("http://www.tf1.fr/live/")
	Case "m6"
		WshShell.run ("http://www.6play.fr/m6/direct#/m6/direct")
	Case "w9"
		WshShell.run ("http://www.6play.fr/w9/direct#/w9/direct")
	Case "d8"
		WshShell.run ("http://www.d8.tv/pid5323-d8-live.html")
	Case "rmc"
		WshShell.run ("http://www.rmcdecouverte.com/player-direct/")
	Case Else
		Wscript.quit
End Select

