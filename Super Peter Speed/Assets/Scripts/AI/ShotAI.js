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

function Start () {

}

function Shot () {
	
	if(Way == true && CanFire == true){
		clone = Instantiate(Buttle, ShotSpawn.transform.position, ShotSpawn.transform.rotation);
		clone.AddForce(Vector2.right * speed);
		CanFire = false;
		yield WaitForSeconds (TimeForShotPress);
		CanFire = true;
		Destroy(clone, 1.0);
	}
	
	if(Way == false && CanFire == true){
		clone = Instantiate(Buttle, ShotSpawn.transform.position, ShotSpawn.transform.rotation);
		clone.AddForce(Vector2.right * -speed);
		CanFire = false;
		yield WaitForSeconds (TimeForShotPress);
		CanFire = true;
		Destroy(clone, 1.0);
	}
}

function Update (){
	
	var EAI : Enemy;
	EAI = Enemy.GetComponent("Enemy");
	
	
	if(EAI.whatway == true){
		Way = false;
	}

	if(EAI.whatway == false){
		Way = true;
	}
}