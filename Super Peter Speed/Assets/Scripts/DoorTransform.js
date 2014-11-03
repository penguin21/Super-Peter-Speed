var DoorTrans : Transform;

function Start () {

}

function Update () {

}

function OnTriggerStay2D(other : Collider2D){
	if(other.gameObject.tag == "Player"){	
		if(Input.GetButton("Interact")){
			other.transform.position = DoorTrans.transform.position;
		}
	}
}