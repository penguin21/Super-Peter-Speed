var speed = 1.5;
var soundWalk : AudioClip;
private var h = false;
 
function Update () {
    transform.Translate(Vector3(Input.GetAxis("Move") * speed * Time.deltaTime, Input.GetAxis("Up and Crouch") * speed * Time.deltaTime, 0.0));
    if(Input.GetButton("Move")){
 		WalkSFX();
    }
    
    if(Input.GetButton("Up and Crouch")){
    	WalkSFX();
    }
}

function WalkSFX(){
	if(!h){
		h = true;
		GetComponent(AudioSource).clip = soundWalk;
    	GetComponent.<AudioSource>().Play();
   		yield WaitForSeconds(0.3);
   		h = false;
   		}
}