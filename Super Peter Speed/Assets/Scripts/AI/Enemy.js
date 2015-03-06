var SoundObject : GameObject;
var speed : int = 5;
var timer : int = 0;
var howlong : int = 40;
var whatway : boolean = true;
var size : float = 5;
var Col1 : Transform;
var Col2 : Transform;
var CollsionIs = false;

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
gameObject.rigidbody2D.velocity = new Vector2 (-speed,0);
}

//Left
if ( whatway == false ) 
{
transform.localScale.x = size;
gameObject.rigidbody2D.velocity = new Vector2 (speed,0);
}

if(Physics2D.Linecast(Col1.position, Col2.position)){
	whatway = !whatway;
	timer = 0;
}
else
if(Physics2D.Linecast(Col1.position, Col2.position, 1 <<  LayerMask.NameToLayer("BGs"))){

}

RayCasting();
Ber();

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
		whatway = false;
		timer = 0;
	}
	if(enemyColl.gameObject.tag == "Obtascule2"){
		whatway = true;
		timer = 0;
	}
}

function RayCasting(){
	CollsionIs = Physics2D.Linecast(Col1.position, Col2.position);
}

function Ber (){
	
}