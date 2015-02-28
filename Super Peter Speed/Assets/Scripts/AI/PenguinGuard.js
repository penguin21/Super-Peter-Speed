var PlayerTarget : Transform;
var L : boolean = false;
var R : boolean = false;
var size : float = 7;
var IsFollowing : boolean = false;
var speed : float = 5;
var searhRange : float = 15;
var SecoundsForChange : float = 0.5;
var anim : Animator;
var Buttle : Rigidbody2D;
var DistanceMax = 35.0;
var DistanceMin = 10.0;
var Walk = true;
var Shotting = false;
var ShotSpawn : GameObject;
var ButtleSpeed = 10.0;
var CanFire = true;
var ShotSound : AudioClip;
var TimeForShotPress = 0.5;
var ButtleSize = 1.818816;

private var FollowingIsReady : boolean = false;
private var distanceToTarget : float = 0.0;

function Start(){
	yield WaitForSeconds (0.1);
	PlayerTarget = GameObject.FindWithTag ("Player").transform;
	IsFollowing = true;
}

function Update(){
	if(IsFollowing == true){
	distanceToTarget = Vector3.Distance(PlayerTarget.transform.position, transform.position);
	if(distanceToTarget <= searhRange){
		ChasePlayer();
	}
	if(Walk == true){
	if(L == true){
		transform.localScale.x = size;
		transform.Translate(Vector3(speed,0,0) * Time.deltaTime);
	}
	
	if(R == true){
		transform.localScale.x = -size;
		transform.Translate(Vector3(-speed,0,0) * Time.deltaTime);
		}
	}
		
	if(distanceToTarget > DistanceMax){
		anim.SetBool("Stand",true);
		anim.SetBool("Walk",false);
		L = false;
		R = false;
		}
	if(distanceToTarget < DistanceMin){
			Shotting = true;
			Shot();
		}
		
	}
}

function ChasePlayer(){
if(Walk == true){
	if(transform.position.x <= PlayerTarget.position.x){
		yield WaitForSeconds (SecoundsForChange);
		anim.SetBool("Stand",false);
		anim.SetBool("Walk",true);
		R = false;
		L = true;
	}
	
	if(transform.position.x >= PlayerTarget.position.x){
		yield WaitForSeconds (SecoundsForChange);
		anim.SetBool("Stand",false);
		anim.SetBool("Walk",true);
		L = false;
		R = true;
	}
	}
}

function Shot(){
	if(Shotting == true){
		if(CanFire == true){
		if(L == true){
		clone = Instantiate(Buttle, ShotSpawn.transform.position, ShotSpawn.transform.rotation);
		clone.rigidbody2D.AddForce(Vector2.right * ButtleSpeed);
		clone.transform.localScale.x = -ButtleSize;
		audio.PlayOneShot(ShotSound, 0.7);
		CanFire = false;
		yield WaitForSeconds (TimeForShotPress);
		CanFire = true;
		Destroy(clone, 1.0);
		}
		if(R == true){
		clone = Instantiate(Buttle, ShotSpawn.transform.position, ShotSpawn.transform.rotation);
		clone.rigidbody2D.AddForce(Vector2.right * -ButtleSpeed);
		audio.PlayOneShot(ShotSound, 0.7);
		clone.transform.localScale.x = ButtleSize;
		CanFire = false;
		yield WaitForSeconds (TimeForShotPress);
		CanFire = true;
		Destroy(clone, 1.0);
		}
		}
	}
}