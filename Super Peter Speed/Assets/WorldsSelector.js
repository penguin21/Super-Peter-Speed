#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerStay2D(other : Collider2D){
	if(other.gameObject.tag == "WorldLevel"){
		gameObject.GetComponent(GUIText).enabled = true;
	}
}

function OnTriggerExit2D(other : Collider2D){
	if(other.gameObject.tag == "WorldLevel"){
		gameObject.GetComponent(GUIText).enabled = false;
	}
}