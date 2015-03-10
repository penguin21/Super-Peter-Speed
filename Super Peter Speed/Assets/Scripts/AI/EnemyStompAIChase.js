var EnemyObj : GameObject;
var EnemyStompSound : AudioClip;
var EnemyStompObj : GameObject;

function OnCollisionEnter2D (other : Collision2D){
	if(other.gameObject.tag == "Player"){
		MainCode.Score += 100;
		GetComponent.<AudioSource>().PlayOneShot(EnemyStompSound);
		EnemyObj.GetComponent(AIChase).enabled = false;
		EnemyObj.GetComponent(BoxCollider2D).enabled = false;
		EnemyStompObj.GetComponent(BoxCollider2D).enabled = false;
		EnemyObj.GetComponent.<Rigidbody2D>().fixedAngle = false;
		yield WaitForSeconds (2);
		Destroy(EnemyObj);
	}
}