var PlayerTarget : Transform;
var size = 21.72359;
var IsFollowing = false;
var searhRange : float = 15;
var AttackRange : float = 8;
var IsAwake = false;
var IsAttack = false;

private var distanceToTarget : float = 0.0;

function Start () {
	yield WaitForSeconds (0.1);
	PlayerTarget = GameObject.FindWithTag ("Player").transform;
	IsFollowing = true;
}

function Update () {
	if(IsFollowing == true){
	distanceToTarget = Vector3.Distance(PlayerTarget.transform.position, transform.position);
		if(distanceToTarget <= searhRange){
			
		}
	}
	if(!IsAttack){
	if(IsAwake){
		GetComponent(Animator).Play("Awake");
	}else{
		GetComponent(Animator).Play("Sleep");
		}
	}
}