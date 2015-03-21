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
var SoundHit : AudioClip;
var Lifes = 5;
var Arm : GameObject;

private var IsDeath = false;
private var lifesU = 1;
private var FollowingIsReady : boolean = false;
private var distanceToTarget : float = 0.0;

function Start(){
	lifesU = Lifes;
	yield WaitForSeconds (0.1);
	PlayerTarget = GameObject.FindWithTag ("Player").transform;
	IsFollowing = true;
}

function Update(){
if(IsDeath == false){
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
	if(lifesU < 0){
		Death();
	}
}

function ChasePlayer(){
if(IsDeath == false){
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
}

function Shot(){
	if(IsDeath == false){
	if(Shotting == true){
		if(CanFire == true){
		if(L == true){
		clone = Instantiate(Buttle, ShotSpawn.transform.position, ShotSpawn.transform.rotation);
		clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.right * ButtleSpeed);
		clone.transform.localScale.x = -ButtleSize;
		GetComponent.<AudioSource>().PlayOneShot(ShotSound, 0.7);
		CanFire = false;
		yield WaitForSeconds (TimeForShotPress);
		CanFire = true;
		Destroy(clone, 1.0);
		}
		if(R == true){
		clone = Instantiate(Buttle, ShotSpawn.transform.position, ShotSpawn.transform.rotation);
		clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.right * -ButtleSpeed);
		GetComponent.<AudioSource>().PlayOneShot(ShotSound, 0.7);
		clone.transform.localScale.x = ButtleSize;
		CanFire = false;
		yield WaitForSeconds (TimeForShotPress);
		CanFire = true;
		Destroy(clone, 1.0);
		}
		}
	}
	}
}

function OnCollisionEnter2D (other : Collision2D){
	if(IsDeath == false){
	if(other.gameObject.tag == "Buttle"){
		anim.Play("Hit");
		anim.SetBool("Stand",false);
		anim.SetBool("Walk",false);
		GetComponent.<AudioSource>().PlayOneShot(SoundHit, 0.7);
		lifesU -= 1; 
		yield WaitForSeconds(0.1);
		anim.SetBool("Stand",true);
		
	}
	}
}

function Death(){
	IsDeath = true;
	Arm.SetActive(false);
	anim.SetBool("Death", true);
	anim.SetBool("Walk", false);
	anim.SetBool("Stand", false);
	anim.SetBool("Hit", false);
	yield WaitForSeconds(2);
	MainCode.Score += 200;
	Destroy(gameObject);
}