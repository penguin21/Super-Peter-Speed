var PlayerTarget : Transform;
var L : boolean = false;
var R : boolean = false;
var size : int = 7;
var IsFollowing : boolean = false;
var speed : float = 5;
var searhRange : float = 15;
var SecoundsForChange : float = 0.5;
var anim : Animator;

private var distanceToTarget : float = 0.0;

function Update(){
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
}

function ChasePlayer(){
	if(transform.position.x <= PlayerTarget.position.x){
		R = false;
		anim.SetBool("Walk",false);
		anim.SetBool("Stand",true);
		yield WaitForSeconds (SecoundsForChange);
		anim.SetBool("Stand",false);
		anim.SetBool("Walk",true);
		L = true;
	}
	
	if(transform.position.x >= PlayerTarget.position.x){
		L = false;
		anim.SetBool("Walk",false);
		anim.SetBool("Stand",true);
		yield WaitForSeconds (SecoundsForChange);
		anim.SetBool("Stand",false);
		anim.SetBool("Walk",true);
		R = true;
	}
}