var PlayerTarget : Transform;
var L : boolean = false;
var R : boolean = false;
var size : int = 7;
var IsFollowing : boolean = false;
var speed : float = 5;
var searhRange : float = 15;
var SecoundsForChange : float = 0.5;
var anim : Animator;
var CanFire = true;
var Buttle : Rigidbody2D;
var ShotSpawn : GameObject;
var ShotSpawn2 : GameObject;
var TimeForShotPress : float = 5.6;

var currentShotSpawn : GameObject;
private var chaseIs = false;
private var FollowingIsReady : boolean = false;
private var distanceToTarget : float = 0.0;

function Start(){
	Debug.Log("Lol");
	yield WaitForSeconds (0.01);
	PlayerTarget = GameObject.FindWithTag ("Player").transform;
	IsFollowing = true;
}

function Update(){
	if(IsFollowing == true){
	distanceToTarget = Vector3.Distance(PlayerTarget.transform.position, transform.position);
	if(distanceToTarget <= searhRange){
		ChasePlayer();
	}
	
	if(L == true){
		currentShotSpawn = ShotSpawn;
		Shot();
	}
	
	if(R == true){
		currentShotSpawn = ShotSpawn2;
		Shot();
		}
	}
}

function ChasePlayer(){
	if(transform.position.x <= PlayerTarget.position.x){
		L = true;
		R = false;
	}
	
	if(transform.position.x >= PlayerTarget.position.x){
		L = false;
		R = true;
	}
}

function Shot(){
	if(L == true){
	if(chaseIs == true && CanFire == true){
		clone = Instantiate(Buttle, ShotSpawn.transform.position, ShotSpawn.transform.rotation);
		clone.AddForce(Vector2.right * speed);
		CanFire = false;
		yield WaitForSeconds (TimeForShotPress);
		CanFire = true;
		Destroy(clone, 1.0);
	}
	}
	if(R == true){
			if(chaseIs == true && CanFire == true){
		clone = Instantiate(Buttle, ShotSpawn.transform.position, ShotSpawn.transform.rotation);
		clone.AddForce(Vector2.right * -speed);
		CanFire = false;
		yield WaitForSeconds (TimeForShotPress);
		CanFire = true;
		Destroy(clone, 1.0);
		}
	}
}