var PlayerTarget : Transform;
var L : boolean = false;
var R : boolean = false;
var size : float = 7;
var IsFollowing : boolean = false;
var speed : float = 5;
var searhRange : float = 15;
var SecoundsForChange : float = 0.5;
var anim : Animator;
var Buttle : GameObject;
var DistanceMax = 35.0;

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
	
	if(L == true){
		transform.localScale.x = size;
		transform.Translate(Vector3(speed,0,0) * Time.deltaTime);
	}
	
	if(R == true){
		transform.localScale.x = -size;
		transform.Translate(Vector3(-speed,0,0) * Time.deltaTime);
		}
		
	if(distanceToTarget > DistanceMax){
		anim.SetBool("Stand",true);
		anim.SetBool("Walk",false);
		L = false;
		R = false;
		}
	}
}

function ChasePlayer(){
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
	
	if(distanceToTarget > 35){
		anim.SetBool("Stand",false);
		anim.SetBool("Walk",false);
		L = false;
		R = false;
	}
}