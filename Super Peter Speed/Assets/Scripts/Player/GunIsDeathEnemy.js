var EnemyObj : GameObject;
var EnemyStompSound : AudioClip;
var EnemyStompObj : GameObject;

function OnCollisionEnter2D (other : Collision2D){
	
	if(other.gameObject.tag == "Buttle"){
		Death();
	}
}

function Death(){
		MainCode.Score += 100;
		audio.PlayOneShot(EnemyStompSound);
		EnemyObj.rigidbody2D.gravityScale = 1;
		EnemyObj.GetComponent(Enemy).enabled = false;
		EnemyObj.GetComponent(BoxCollider2D).enabled = false;
		EnemyStompObj.GetComponent(BoxCollider2D).enabled = false;
		rigidbody2D.fixedAngle = false;
		yield WaitForSeconds (2);
		Destroy(EnemyObj);
}