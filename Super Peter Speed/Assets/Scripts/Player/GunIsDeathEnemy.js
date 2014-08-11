var EnemyObj : GameObject;
var EnemyStompSound : AudioClip;
var EnemyStompObj : GameObject;

function OnCollisionEnter2D (other : Collision2D){
	if(other.gameObject.tag == "Buttle"){

		MainCode.Score += 100;
		audio.PlayOneShot(EnemyStompSound);
		EnemyObj.GetComponent(Enemy).enabled = false;
		EnemyObj.GetComponent(BoxCollider2D).enabled = false;
		EnemyStompObj.GetComponent(BoxCollider2D).enabled = false;
		rigidbody2D.fixedAngle = false;
		yield WaitForSeconds (2);
		Destroy(EnemyObj);
	}
}