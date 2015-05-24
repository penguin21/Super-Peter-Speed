import System.Collections.Generic;
 import System.Xml;
 import System.IO;

var LevelEditorMag : LevelEditorManager;
var LevelUsed = "Level";
var LevelsFolder : String = "/Levels";
var MusicFolder : String = "/Music";
var CustomSpritesFolder : String = "/CustomSprites";
var LocalFolder : String = "/Super Peter Speed";

private var appdata : String;
var LevelLocalDe : String;
appdata = System.Environment.GetFolderPath(System.Environment.SpecialFolder.ApplicationData)+ LocalFolder;
LevelLocalDe = appdata + LevelsFolder;

public function SaveLevel(){
	LevelEditorMag.LevelObjects.Save(Path.Combine(LevelLocalDe, LevelUsed));
}

public function LoadLevel(){
	LevelEditorMag.LevelObjects.Load(Path.Combine(LevelLocalDe, LevelUsed));
}