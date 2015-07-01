import System.Collections.Generic;
import System.Xml;
import System.IO;
import System.Xml.Serialization;
import System.Text;

@XmlRoot("LevelHY")
public class LevelObjects extends MonoBehaviour{
	@XmlArray("LevelObjData")
 	@XmlArrayItem("LevelObject")
 	@XmlElement
 	public var LevelObjectsList : List.<LevelEditorID>;
 	public var LevelUsed = "Level";
 	public var path : String;
 	public var pathSps : String = "/Super Peter Speed";
 	@XmlElement
 	public var LevelT : Transform;
 	private var appdata : String;
 	private var LevelsFolder : String = "/Levels";
 	
 	function Update(){
 		appdata = System.Environment.GetFolderPath(System.Environment.SpecialFolder.ApplicationData) + pathSps;
 		path = appdata + LevelsFolder;
 	}
 	
 	public function Save(path : String){
		//Not implemented
		var serializer : XmlSerializer = new XmlSerializer(LevelEditorID);
 		var stream : Stream = new FileStream(path, FileMode.Create);
 		serializer.Serialize(stream, this);
 		Debug.Log("Level Saving...");
 		stream.Close();
 		Debug.Log("Level Saved");
	}

	public static function Loading(path : String):LevelEditorID{
		//Not implemented
		var serializer : XmlSerializer = new XmlSerializer(LevelEditorID);
 		var stream : Stream = new FileStream(path, FileMode.Open);
 		var level : LevelEditorID = serializer.Deserialize(stream) as LevelEditorID;
 		Debug.Log("Level Loading...");
 		stream.Close();
 		Debug.Log("Level Loaded");
 		return level;
	}
	
	public static function LoadFormText(text : String):LevelEditorID{
		//Not implemented
		var serializer : XmlSerializer = new XmlSerializer(LevelEditorID);
 		return serializer.Deserialize(new StringReader(text)) as LevelEditorID;
	}
	public function Write(){
		Save(Path.Combine(path, LevelUsed));
	}

	public function Read(){
		var LevelData : LevelEditorID = LevelEditorID.Loading(Path.Combine(path, LevelUsed));
	}
}