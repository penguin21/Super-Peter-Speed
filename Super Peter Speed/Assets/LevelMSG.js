var MSG : GameObject;
var LevelName : String;
var IsLevel = false;

function Start () {

}

function Update () {

}

function OnTriggerStay2D(other : Collider2D){
	if(other.gameObject.tag == "CharMap"){
		MSG.SetActive(true);
		if(IsLevel){
			if(Input.GetButtonDown("Interact")){
				Application.LoadLevel(LevelName);
			}
		}
	}
}

function OnTriggerExit2D(other : Collider2D){
	if(other.gameObject.tag == "CharMap"){
		MSG.SetActive(false);
	}
}