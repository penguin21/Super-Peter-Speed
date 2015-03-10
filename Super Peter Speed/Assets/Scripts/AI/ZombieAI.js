var SoundObject : GameObject;
var IsMoving : boolean = true;
var speed : int = 5;
var timer : int = 0;
var howlong : int = 40;
var whatway : boolean = true;
var size : int = 5;
var stop : boolean = false;
var stopTime : float = 0.8;
var IsWalk : boolean = true;
var StoppingTime : float = 4;
var IsFollow : boolean = false;
var IsWaitingForFollow : boolean = false;
var anim : Animator;
var PlayerTransform : Transform;
var SpeedFollow : float = 2;

private var minDistance : float = 0;
private var range : float;

function Update () {
if (MainCode.pause == true ) 
{
return;
}
if(IsMoving == true){
timer += 1;
if ( timer >= howlong ) {
timer = 0;

if ( whatway == true ) 
{
whatway = false;
return;
}

if ( whatway == false ) 
{
whatway = true;
return;
}
}
}


if(IsWalk == true){
//Right
if ( whatway == true ) 
{
anim.SetBool("Walk", true);
transform.localScale.x = -size;
gameObject.GetComponent.<Rigidbody2D>().velocity = new Vector2 (-speed,0);
}

//Left
if ( whatway == false ) 
{
anim.SetBool("Walk", true);
transform.localScale.x = size;
gameObject.GetComponent.<Rigidbody2D>().velocity = new Vector2 (speed,0);
	}
}
if(IsWalk == false){

if(stop == true){
	anim.SetBool("Walk", false);
	anim.SetBool("Stand", true);
	transform.localScale.x = size;
	transform.Translate(Vector3(0,0,0) * Time.deltaTime);
	WaitForSeconds (stopTime);
	IsWalk = true;
	stop = false;
}
}
	if(IsWaitingForFollow == true && IsMoving == false){
		anim.SetBool("Walk", false);
	anim.SetBool("Stand", true);
	transform.localScale.x = size;
	transform.Translate(Vector3(0,0,0) * Time.deltaTime);
	WaitForSeconds (0.7);
	Follow();
	}

}


function OnTriggerEnter2D (other : Collider2D)
{

if(other.gameObject.tag == "Good_Shoot") 
{
if ( MainCode.Sound == 0 ) {
Instantiate(SoundObject, transform.position + Vector3(0, 0, 0), Quaternion.Euler(0,0,0) );
}
Destroy(gameObject); 
}
}

function OnCollisionEnter2D(enemyColl : Collision2D){
	if(enemyColl.gameObject.tag == "Obtascule"){
		whatway = false;
	}
	if(enemyColl.gameObject.tag == "Obtascule2"){
		whatway = true;
	}
}

function Follow(){
	IsFollow = true;
	IsWaitingForFollow = false;
	anim.SetBool("Walk", true);
	if(IsFollow == true){
	  range = Vector2.Distance(transform.position, PlayerTransform.position);
 		if (range > minDistance)
        {
            Debug.Log(range);
 
           transform.position = Vector2.MoveTowards(transform.position, PlayerTransform.position, SpeedFollow * Time.deltaTime);
        }
}
}