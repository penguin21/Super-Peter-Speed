var SpeedObject : float = 1;
var FloatIs : boolean = false;
var Obje : Rigidbody2D;

function Start () {

}

function Update () {
	if(FloatIs == true){
		Obje.AddForce(transform.up * SpeedObject);
	}
}

function OnTriggerStay2D (other : Collider2D){
	if(other.gameObject.tag == "Water"){
		FloatIs = true;
	}
}

function OnTriggerExit2D (other : Collider2D){
	if(other.gameObject.tag == "Water"){
		FloatIs = false;
	}
}