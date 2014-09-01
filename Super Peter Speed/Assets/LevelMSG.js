var MSG : GameObject;

function Start () {

}

function Update () {

}

function OnTriggerEnter2D(other : Collider2D){
	if(other.gameObject.tag == "CharMap"){
		MSG.SetActive(true);
	}
}

function OnTriggerExit2D(other : Collider2D){
	if(other.gameObject.tag == "CharMap"){
		MSG.SetActive(false);
	}
}