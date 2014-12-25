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
var ShotSound : AudioClip;

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
		chaseIs = true;
		ChasePlayer();
	}
	
	if(L == true){
		currentShotSpawn = ShotSpawn2;
	}
	
	if(R == true){
		currentShotSpawn = ShotSpawn;
		}
	}
}

function ChasePlayer(){
	if(transform.position.x <= PlayerTarget.position.x){
		L = true;
		R = false;
		Shot();
	}
	
	if(transform.position.x >= PlayerTarget.position.x){
		L = false;
		R = true;
		Shot();
	}
}

function Shot(){
	yield WaitForSeconds(0.1);
	if(L == true){
	if(chaseIs == true && CanFire == true){
		clone = Instantiate(Buttle, currentShotSpawn.transform.position, currentShotSpawn.transform.rotation);
		clone.AddForce(Vector2.right * speed);
		audio.PlayOneShot(ShotSound, 0.7);
		CanFire = false;
		yield WaitForSeconds (TimeForShotPress);
		CanFire = true;
		Destroy(clone, 1.0);
	}
	}
	if(R == true){
	if(chaseIs == true && CanFire == true){
		clone = Instantiate(Buttle, currentShotSpawn.transform.position, currentShotSpawn.transform.rotation);
		clone.AddForce(Vector2.right * -speed);
		audio.PlayOneShot(ShotSound, 0.7);
		CanFire = false;
		yield WaitForSeconds (TimeForShotPress);
		CanFire = true;
		Destroy(clone, 1.0);
		}
	}
}