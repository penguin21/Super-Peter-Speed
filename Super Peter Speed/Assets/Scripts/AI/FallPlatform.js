var timeToFall : float;
var TimeToRespawn = 10.0;
var RespawnPoint : Transform;

function OnCollisionEnter2D(other : Collision2D){
	if(other.gameObject.tag == "Player"){
	yield WaitForSeconds(timeToFall);
	rigidbody2D.isKinematic = false;
	yield WaitForSeconds(TimeToRespawn);
	rigidbody2D.isKinematic = true;
	transform.localRotation.z = 0;
	if(!RespawnPoint){
			//Is platforms no error
		}
		else{
			gameObject.transform.position = RespawnPoint.transform.position;
		}
	}
}