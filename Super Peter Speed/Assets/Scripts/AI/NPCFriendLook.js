var PlayerTarget : Transform;
var L : boolean = false;
var R : boolean = false;
var range : float = 15;
var size : int = 5;
var SecoundsForChange : float = 0.5;
var IsLooking : boolean = false;

private var LookIsReady : boolean = false;
private var distanceToTarget : float = 0.0;

function Start () {
	yield WaitForSeconds (0.01);
	PlayerTarget = GameObject.FindWithTag ("Player").transform;
	IsLooking = true;
}

function Update () {
	if(IsLooking == true){
	distanceToTarget = Vector3.Distance(PlayerTarget.transform.position, transform.position);
	if(distanceToTarget <= range){
		LookPlayer();
	}
	
	if(L == true){
		transform.localScale.x = size;
	}
	
	if(R == true){
		transform.localScale.x = -size;
		}
	}
}

function LookPlayer(){
		if(transform.position.x <= PlayerTarget.position.x){
		yield WaitForSeconds (SecoundsForChange);
		R = false;
		L = true;
	}
	
	if(transform.position.x >= PlayerTarget.position.x){
		yield WaitForSeconds (SecoundsForChange);
		L = false;
		R = true;
	}
}