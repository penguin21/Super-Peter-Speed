﻿var SoundObject : GameObject;
var speed : int = 5;
var timer : int = 0;
var howlong : int = 40;
var whatway : boolean = true;
var size : float = 5;
var Col1 : Transform;
var Col2 : Transform;
var CollsionIs = false;
var Ignore : LayerMask;
var PlayerTarget : Transform;
var ToActivation = false;
var searhRange : float = 15;
var IsTimer = false;

private var Pause : GameObject;
private var IsPause = false;
private var IsJump = false;
private var IsWalking = false;
private var distanceToTarget : float = 0.0;

function Start(){
	Pause = GameObject.FindWithTag ("Pause");
	yield WaitForSeconds (0.1);
	PlayerTarget = GameObject.FindWithTag ("Player").transform;
	ToActivation = true;
}

function Update () {
if(IsPause == false){
	if(ToActivation  == true){
	distanceToTarget = Vector3.Distance(PlayerTarget.transform.position, transform.position);
	if(distanceToTarget <= searhRange){
		IsWalking = true;
		IsJump = true;
	}
	
if (MainCode.pause == true ) 
{
return;
}
		if(IsWalking == true){
	if(IsTimer == true){
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




//Right
if ( whatway == true ) 
{
transform.localScale.x = -size;
gameObject.GetComponent.<Rigidbody2D>().AddForce(Vector2.right * -speed);
}

//Left
if ( whatway == false ) 
{
transform.localScale.x = size;
gameObject.GetComponent.<Rigidbody2D>().AddForce(Vector2.right * speed);;
}

}
}

RayCasting();
Ber();
}
	if(Pause.GetComponent(SimplePause).pauseGame == true){
		IsPause = true;
	}
	else{
		IsPause = false;
	}
}


function OnTriggerEnter2D (other : Collider2D){

if(other.gameObject.tag == "Good_Shoot") 
{
if ( MainCode.Sound == 0 ) {
Instantiate(SoundObject, transform.position + Vector3(0, 0, 0), Quaternion.Euler(0,0,0) );
}
Destroy(gameObject); 
}

if(other.gameObject.tag == "Obtascule"){
		whatway = false;
		timer = 0;
	}
	if(other.gameObject.tag == "Obtascule2"){
		whatway = true;
		timer = 0;
	}

}

function OnCollisionEnter2D(enemyColl : Collision2D){
	if(enemyColl.gameObject.tag == "Obtascule"){
		whatway = !whatway;
		timer = 0;
	}
	if(enemyColl.gameObject.tag == "Obtascule2"){
		whatway = !whatway;
		timer = 0;
	}
	if(IsJump == true){
	gameObject.GetComponent(Animator).SetBool("Jump", true);
	}
}
function OnCollisionExit2D(enemyColl : Collision2D){
	if(IsJump == true){
	yield WaitForSeconds(0.2);
	gameObject.GetComponent(Animator).SetBool("Jump", false);
	}
}

function RayCasting(){
	CollsionIs = Physics2D.Linecast(Col1.position, Col2.position);
	
	if(Physics2D.Linecast(Col1.position, Col2.position)){
	whatway = !whatway;
	timer = 0;
	}
}

function Ber (){
	
}