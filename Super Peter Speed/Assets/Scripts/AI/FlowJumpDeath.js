var IsButtle = false;
var IsStomp = true;
var SoundHit : AudioClip;
var EnemyObj : GameObject;
var EnemyStompObj : GameObject;

function OnCollisionEnter2D(et : Collision2D){
	if(IsButtle == true){
		if(et.gameObject.tag == "Buttle"){
		MainCode.Score += 100;
		EnemyObj.GetComponent.<Rigidbody2D>().gravityScale = 5;
		GetComponent.<AudioSource>().PlayOneShot(SoundHit);
		EnemyObj.GetComponent(FlowJump).enabled = false;
		EnemyObj.GetComponent(BoxCollider2D).enabled = false;
		EnemyStompObj.GetComponent(BoxCollider2D).enabled = false;
		EnemyObj.GetComponent.<Rigidbody2D>().fixedAngle = false;
		yield WaitForSeconds (2);
		Destroy(EnemyObj);
		}
	}
	
	if(IsStomp == true){
		if(et.gameObject.tag == "Player"){
		EnemyObj.tag = "Untagged";
		MainCode.Score += 100;
		EnemyObj.GetComponent.<Rigidbody2D>().gravityScale = 5;
		GetComponent.<AudioSource>().PlayOneShot(SoundHit);
		EnemyObj.GetComponent(FlowJump).enabled = false;
		EnemyObj.GetComponent(BoxCollider2D).enabled = false;
		EnemyStompObj.GetComponent(BoxCollider2D).enabled = false;
		EnemyObj.GetComponent.<Rigidbody2D>().fixedAngle = false;
		yield WaitForSeconds (2);
		Destroy(EnemyObj);
		}
	}
}