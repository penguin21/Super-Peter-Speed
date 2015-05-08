var size : float = 5;
var speed : float = 5;
var whatway : boolean;
var PlayerTarget : Transform;
var IsFollowing : boolean = false;
var BossStartIs : boolean = false;
var SecoundsForChange : float = 1;
var anim : Animator;
var searhRange : float = 15;
var IsWalking :  boolean = true;

var distanceToTarget : float = 0.0;

function Start () {
	yield WaitForSeconds (0.01);
	PlayerTarget = GameObject.FindWithTag ("Player").transform;
	IsFollowing = true;
}

function Update () {


		if(IsFollowing == true){
	distanceToTarget = Vector3.Distance(PlayerTarget.transform.position, transform.position);
	if(distanceToTarget <= searhRange){
		ChasePlayer();
	}
}
if(BossStartIs == true){
if(IsWalking == true){
if ( whatway == true ) 
{
transform.localScale.x = size;
GetComponent.<Rigidbody2D>().velocity = new Vector2 (speed,GetComponent.<Rigidbody2D>().velocity.y);
}

//Left
if ( whatway == false ) 
{
transform.localScale.x = -size;
GetComponent.<Rigidbody2D>().velocity = new Vector2 (-speed,GetComponent.<Rigidbody2D>().velocity.y);
		}
	}

	if(distanceToTarget <= 5){
		anim.SetBool("Stand",true);
		anim.SetBool("Walk",false);
		IsWalking = false;
		}
	}
	if(distanceToTarget >= 5){
		anim.SetBool("Stand",false);
		anim.SetBool("Walk",true);
		IsWalking = true;
	}
	if(BossStartIs == false){
		anim.SetBool("Stand",true);
	}
}

function ChasePlayer(){
if(IsWalking == true){
	if(transform.position.x <= PlayerTarget.position.x){
		yield WaitForSeconds (SecoundsForChange);
		anim.SetBool("Stand",false);
		anim.SetBool("Walk",true);
		whatway = true;
	}
	
	if(transform.position.x >= PlayerTarget.position.x){
		yield WaitForSeconds (SecoundsForChange);
		anim.SetBool("Stand",false);
		anim.SetBool("Walk",true);
		whatway = false;
		}
	}
}