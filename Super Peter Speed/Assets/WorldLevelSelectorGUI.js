var textWorldObj : GameObject;

function Start () {

}

function Update () {

}

function OnTriggerEnter2D(other : Collider2D){
	if(other.gameObject.tag == "WorldCam"){
		textWorldObj.SetActive(true);
	}
}

function OnTriggerExit2D(other : Collider2D){
	if(other.gameObject.tag == "WorldCam"){
		textWorldObj.SetActive(false);
	}
}