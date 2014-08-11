var timeToFall : float;

function OnCollisionEnter2D(other : Collision2D){
	if(other.gameObject.tag == "Player"){
	yield WaitForSeconds(timeToFall);
	rigidbody2D.isKinematic = false;
	}
}