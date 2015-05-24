import System.Collections.Generic;
import System.Xml;
import System.IO;
import System.Xml.Serialization;

@XmlRoot("LevelObjectsCollection")
public class LevelObjects extends MonoBehaviour{
	@XmlArray("LevelObjects")
 	@XmlArrayItem("LevelObject")
 	public var LevelObjectsList : LevelEditorID[];
 	public var LevelUsed = "Level";
 	public var path : String;
 	public var pathSps : String = "/Super Peter Speed";
 	public var LevelT : GameObject;
 	private var appdata : String;
 	private var LevelsFolder : String = "/Levels";
 	
 	function Update(){
 		appdata = System.Environment.GetFolderPath(System.Environment.SpecialFolder.ApplicationData) + pathSps;
 		path = appdata + LevelsFolder;
		LevelObjectsList = GameObject.FindObjectsOfType(LevelEditorID);
 	}
 	
 	public function Save(path : String){
		//Not implemented
		var serializer : XmlSerializer = new XmlSerializer(typeof(LevelObjects));
 		var stream : Stream = new FileStream(path, FileMode.Create);
 		serializer.Serialize(stream, this);
 		stream.Close();
 		Debug.Log("Level Saved");
	}

	public static function Loading(path : String):LevelObjects{
		//Not implemented
		var serializer : XmlSerializer = new XmlSerializer(typeof(LevelObjects));
 		var stream : Stream = new FileStream(path, FileMode.Open);
 		var level : LevelObjects = serializer.Deserialize(stream) as LevelObjects;
 		stream.Close();
 		Debug.Log("Level Loaded");
 		return level;
	}
	
	public static function LoadFormText(text : String):LevelObjects{
		//Not implemented
		var serializer : XmlSerializer = new XmlSerializer(LevelObjects);
 		return serializer.Deserialize(new StringReader(text)) as LevelObjects;
	}
	public function Write(){
		Save(Path.Combine(path, LevelUsed));
	}

	public function Read(){
		var LevelData : LevelObjects = LevelObjects.Loading(Path.Combine(path, LevelUsed));
	}
}