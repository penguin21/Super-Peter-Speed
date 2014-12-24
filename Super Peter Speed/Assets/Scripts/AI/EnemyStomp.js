var EnemyObj : GameObject;
var EnemyStompSound : AudioClip;
var EnemyStompObj : GameObject;

function OnCollisionEnter2D (other : Collision2D){
	if(other.gameObject.tag == "Player"){
		EnemyObj.tag = "Untagged";
		EnemyObj.rigidbody2D.fixedAngle = false;
		MainCode.Score += 100;
		audio.PlayOneShot(EnemyStompSound);
		EnemyObj.rigidbody2D.gravityScale = 1;
		EnemyObj.GetComponent(Enemy).enabled = false;
		EnemyObj.GetComponent(BoxCollider2D).enabled = false;
		EnemyStompObj.GetComponent(BoxCollider2D).enabled = false;
		yield WaitForSeconds (2);
		Destroy(EnemyObj);
	}
}