var MusicFolder : String = "/Music";
var LevelsFolder : String = "/Levels";
var CustomSpritesFolder : String = "/CustomSprites";
var LocalFolder : String = "/Super Peter Speed";
var appdata : String;
var Screenshots : String = "/Screenshots";
appdata = System.Environment.GetFolderPath(System.Environment.SpecialFolder.ApplicationData)+ LocalFolder;

function Awake(){

}

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
 	
 	if(!Directory.Exists(appdata + Screenshots)){    
     //if it doesn't, create it
     Directory.CreateDirectory(appdata + Screenshots);
     Debug.Log("Directory Screenshot folder is Created on " + appdata + Screenshots);
 	}
}

function Update () {

}