import System.Collections.Generic;
import System.Xml.Serialization;

public class LevelEditorID extends MonoBehaviour{
	@XmlAttribute("LevelObjID")
	public var ID = 0;
	public var IsNPC = false;
	private var NPCObj : GameObject; //Only "IsNPC = true"
	private var IsPlay = false;

	private var h = true;

	function Start () {

	}

	function Update () {
		if(IsNPC){
			if(IsPlay){
				if(h){
					h = false;
					Instantiate (NPCObj, gameObject.transform.position, gameObject.transform.rotation);
					Destroy(gameObject);
				}
			}
		}
	}
}