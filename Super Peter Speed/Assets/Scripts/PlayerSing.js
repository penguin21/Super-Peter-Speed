var textObj : GameObject;

function Start () {
	textObj.SetActive(false);
}

function Update () {

}

function OnTriggerEnter2D(other : Collider2D){
	if(other.gameObject.tag == "Player"){
		textObj.SetActive(true);
	}
}

function OnTriggerExit2D(other : Collider2D){
	if(other.gameObject.tag == "Player"){
		textObj.SetActive(false);
	}
}