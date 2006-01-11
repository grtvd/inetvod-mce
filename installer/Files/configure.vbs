set fs = CreateObject("Scripting.FileSystemObject")
set shell = CreateObject("WScript.Shell")

msgbox "hello"
msgbox isobject(cscript)
msgbox WScript.Arguments.Count
msgbox WScript.Arguments.Item(0)
npath = "c:\Program Files\iNetVOD\iNetVOD Media Center Edition\iNetVOD.mcl"
msgbox npath

loc = shell.SpecialFolders("AllUsersPrograms") & "\Accessories"
if not (fs.FolderExists(loc)) then fs.CreateFolder(loc)

loc= loc & "\Media Center"
if not (fs.FolderExists(loc)) then fs.CreateFolder(loc)

loc= loc & "\Media Center Programs"
if not (fs.FolderExists(loc)) then fs.CreateFolder(loc)

loc = loc & "\iNetVOD.lnk"
set lnk = shell.CreateShortcut (loc)
lnk.targetpath = npath
'lnk.save