var SoundObject : GameObject;
var speed : int = 5;
var timer : int = 0;
var howlong : int = 40;
var whatway : boolean = true;
var size : int = 5;

function Update () {
if (MainCode.pause == true ) 
{
return;
}

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




//Right
if ( whatway == true ) 
{
transform.localScale.x = -size;
transform.Translate(Vector3(-speed,0,0) * Time.deltaTime);
}

//Left
if ( whatway == false ) 
{
transform.localScale.x = size;
transform.Translate(Vector3(speed,0,0) * Time.deltaTime);
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