var EnemyObj : GameObject;
var EnemyStompSound : AudioClip;
var EnemyStompObj : GameObject;
var lifesMax = 3;
var lifesDownSound : AudioClip;

private var lifes : int; 

function Start(){
	lifes = lifesMax;
}

function OnCollisionEnter2D (other : Collision2D){
	if(other.gameObject.tag == "Buttle"){
		lifes -= 1;//Is an buttle is life less 1
		if(lifes > 0){
			GetComponent.<AudioSource>().PlayOneShot(lifesDownSound);
		}
		if(lifes == 0){
		MainCode.Score += 100;
		GetComponent.<AudioSource>().PlayOneShot(EnemyStompSound);
		EnemyStompObj.transform.parent = null;
		EnemyObj.GetComponent.<Rigidbody2D>().gravityScale = 1;
		EnemyObj.GetComponent(AIChase).enabled = false;
		EnemyObj.GetComponent(BoxCollider2D).enabled = false;
		EnemyStompObj.AddComponent(Rigidbody2D);
		EnemyObj.GetComponent.<Rigidbody2D>().fixedAngle = false;
		yield WaitForSeconds(5);// Wait for destroy the object
		Destroy(EnemyStompObj);
		Destroy(gameObject);
		}
	}
}