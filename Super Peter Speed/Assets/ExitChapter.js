var SaveName : String;
var SceneTo : String;

function OnTriggerEnter2D(other : Collider2D){
		if(other.gameObject.tag == "Player"){
	PlayerPrefs.SetInt(SaveName, 1);
	Debug.Log("Chapter Complete");
	yield WaitForSeconds(0.2);
	Application.LoadLevel(SceneTo);
	}
}