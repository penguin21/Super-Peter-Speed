var IsX : boolean = false;
var IsY : boolean = false;
var IsStartingFlying : boolean = false;
var PlayerTarget : Transform;
var IsWalking : boolean = true;
var timer : int = 0;
var howlong : int = 150;
var anim : Animator;
var speed : int = 5;
var size : int = 5;
var IsWay : boolean = false;
var IsFly : boolean = true;
var searhRange : float = 15;
var IsFollowing : boolean = false;
var SpeedFly : int = 15;
var SpeedUpFly : int = 20;


private var distanceToTarget : float = 0.0;
private var Standing : boolean = true;

function Start () {
	yield WaitForSeconds (0.01);
	PlayerTarget = GameObject.FindWithTag ("Player").transform;
	IsStartingFlying = true;
	IsFollowing = true;
}

function Update () {
if(IsWalking == true){
	timer += 1;
if ( timer >= howlong ) {
timer = 0;

if ( IsWay == true ) 
{
Standing = true;
WaitForSeconds(2);
Standing = false;
IsWay = false;
return;
}

if ( IsWay == false ) 
{
Standing = true;
WaitForSeconds(2);
Standing = false;
IsWay = true;
return;
}
}


}
	
	if(IsFollowing == true){
		distanceToTarget = Vector3.Distance(PlayerTarget.transform.position, transform.position);
		if(distanceToTarget <= searhRange){
			FlyStart();
		}
	if(Standing == true){
		anim.SetBool("Walking",false);
		anim.SetBool("Stand",true);
		anim.SetBool("Flying",false);
		transform.Translate(Vector3(0,0,0) * Time.deltaTime);
	}

	if(IsWalking == true){
	//Right
if ( IsWay == true ) 
{
anim.SetBool("Stand",false);
anim.SetBool("Walking",true);
anim.SetBool("Flying",false);
transform.localScale.x = -size;
transform.Translate(Vector3(-speed,0,0) * Time.deltaTime);
}

//Left
if ( IsWay == false ) 
{
anim.SetBool("Stand",false);
anim.SetBool("Walking",true);
anim.SetBool("Flying",false);
transform.localScale.x = size;
transform.Translate(Vector3(speed,0,0) * Time.deltaTime);
			}
		}
	}
}

function FlyStart(){
	if(transform.position.x <= PlayerTarget.position.x){
		yield WaitForSeconds (1);
		IsWalking = false;
		anim.SetBool("Stand",false);
		anim.SetBool("Walking",false);
		anim.SetBool("Flying",true);
		transform.localScale.x = -size;
		transform.Translate(Vector3(-SpeedFly,SpeedUpFly,0) * Time.deltaTime);
		yield WaitForSeconds (1);
		IsWalking = true;
	}
	
	if(transform.position.x >= PlayerTarget.position.x){
		yield WaitForSeconds (1);
		IsWalking = false;
		anim.SetBool("Stand",false);
		anim.SetBool("Walking",false);
		anim.SetBool("Flying",true);
		transform.localScale.x = size;
		transform.Translate(Vector3(SpeedFly,SpeedUpFly,0) * Time.deltaTime);
		yield WaitForSeconds (1);
		IsWalking = true;
		}
	}