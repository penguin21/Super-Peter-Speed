var EnemyObj : GameObject;
var EnemyStompSound : AudioClip;
var EnemyStompObj : GameObject;

function OnCollisionEnter2D (other : Collision2D){
	if(other.gameObject.tag == "Buttle"){
		MainCode.Score += 100;
		GetComponent.<AudioSource>().PlayOneShot(EnemyStompSound);
		EnemyObj.GetComponent.<Rigidbody2D>().gravityScale = 1;
		EnemyObj.GetComponent(AIChase).enabled = false;
		EnemyObj.GetComponent(BoxCollider2D).enabled = false;
		EnemyStompObj.AddComponent(Rigidbody2D);
		EnemyObj.GetComponent.<Rigidbody2D>().fixedAngle = false;
	}
}