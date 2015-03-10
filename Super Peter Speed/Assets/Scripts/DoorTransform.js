var DoorTrans : Transform;
var DoorOpen : AudioClip;

function Start () {

}

function Update () {

}

function OnTriggerStay2D(other : Collider2D){
	if(other.gameObject.tag == "Player"){	
		if(Input.GetButtonDown("Interact")){
			other.transform.position = DoorTrans.transform.position;
			GetComponent.<AudioSource>().PlayOneShot(DoorOpen, 0.7);
		}
	}
}