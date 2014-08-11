var SoundObject : GameObject;
var speed : int = 5;
var timer : int = 0;
var howlong : int = 40;
var whatway : boolean = true;

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
transform.Translate(Vector3(-speed,0,0) * Time.deltaTime);
}

//Left
if ( whatway == false ) 
{
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