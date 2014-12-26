var Buttle : Rigidbody2D;
var ShotSpawn : GameObject;
var TimeForShot : float = 1.5;
var TimeForShotPress : float = 5.6;
var speed : float = 7.5;
var CanFire : boolean = true;
var Enemy : GameObject;
var Way : boolean = true;
var repeatShot : boolean = true;
var RepeatShotTime : float = 10;
var SoundShot : AudioClip;

function Start () {

}

function Shot () {
	
	var EAI : Enemy;
	EAI = Enemy.GetComponent("Enemy");
	
	if(EAI.whatway == true && CanFire == true){
		clone = Instantiate(Buttle, ShotSpawn.transform.position, ShotSpawn.transform.rotation);
		clone.rigidbody2D.AddForce(Vector2.right * -speed);
		audio.PlayOneShot(SoundShot, 0.7);
		CanFire = false;
		yield WaitForSeconds (TimeForShotPress);
		CanFire = true;
		Destroy(clone, 1.0);
	}
	
	if(EAI.whatway == false && CanFire == true){
		clone = Instantiate(Buttle, ShotSpawn.transform.position, ShotSpawn.transform.rotation);
		clone.rigidbody2D.AddForce(Vector2.right * speed);
		CanFire = false;
		audio.PlayOneShot(SoundShot, 0.7);
		yield WaitForSeconds (TimeForShotPress);
		CanFire = true;
		Destroy(clone, 1.0);
	}
}

function Update (){
	
	var EAI : Enemy;
	EAI = Enemy.GetComponent("Enemy");
	
	
	if(EAI.whatway == true){
		Shot();
	}

	if(EAI.whatway == false){
		Shot();
	}
}