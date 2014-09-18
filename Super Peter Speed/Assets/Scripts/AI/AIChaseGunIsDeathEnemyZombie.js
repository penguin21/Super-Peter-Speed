var EnemyObj : GameObject;
var EnemyStompSound : AudioClip;
var EnemyStompObj : GameObject;

function OnCollisionEnter2D (other : Collision2D){
	if(other.gameObject.tag == "Buttle"){
		MainCode.Score += 100;
		audio.PlayOneShot(EnemyStompSound);
		EnemyObj.GetComponent(AIChase).enabled = false;
		EnemyObj.GetComponent(BoxCollider2D).enabled = false;
		EnemyStompObj.AddComponent(Rigidbody2D);
		EnemyObj.rigidbody2D.fixedAngle = false;
	}
}