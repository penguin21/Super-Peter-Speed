import System.Xml;
import System.Xml.Serialization;

var LevelT : Transform;
var IsEditor = true;
var MenuGUI : GameObject;
var LevelUsed = "Level.xml";
var LevelsFolder : String = "/Levels";
var MusicFolder : String = "/Music";
var CustomSpritesFolder : String = "/CustomSprites";
var LocalFolder : String = "/Super Peter Speed";

private var appdata : String;
appdata = System.Environment.GetFolderPath(System.Environment.SpecialFolder.ApplicationData)+ LocalFolder;

private var menu = false;

function Start () {
	if(!Directory.Exists(appdata + MusicFolder)){    
     //if it doesn't, create it
     Directory.CreateDirectory(appdata + MusicFolder);
     Debug.Log("Directory Music is Created on " + appdata + MusicFolder);
 	}
 	
 	if(!Directory.Exists(appdata + LevelsFolder)){    
     //if it doesn't, create it
     Directory.CreateDirectory(appdata + LevelsFolder);
     Debug.Log("Directory Levels is Created on " + appdata + LevelsFolder);
 	}
 	
 	 if(!Directory.Exists(appdata + CustomSpritesFolder)){    
     //if it doesn't, create it
     Directory.CreateDirectory(appdata + CustomSpritesFolder);
     Debug.Log("Directory Custom Sprites is created on "+ appdata + CustomSpritesFolder);
 	}
}

function Update () {

}

function DeleteAllObjects(){
	 for (var child : Transform in LevelT){
     GameObject.Destroy(child.gameObject);
 	 }	
}

function MenuSet(){

}

function PanelNew (Panel : GameObject){
	Panel.SetActive(true);
}

function PanelOld(Panel : GameObject){
	Panel.SetActive(false);
}

@XmlRoot("LevelObjects")
public class LevelObjects{
	@XmlArray("LevelObjects")
 	@XmlArrayItem("LevelObject")
 	public var LevelObjects : List.<LevelEditorID>;
 	
	public function Save(){
		//Not implemented
	}

	public static function Loading():LevelObjects{
		//Not implemented
	}
	
	public static function LoadFormText(text : String):LevelObjects{
		//Not implemented
	}
}