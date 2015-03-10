var PlayerTarget : Transform; //Look the target
var speedRot : float = 5.0;
var speed : float = 5.0;
var Buttle : Rigidbody2D;
var IsFollowing = false;
var searhRange : float = 15;
var ShotSpawn : GameObject;
var canFire = true;
var ButtlesTotal = 15;
var ShotSound : AudioClip;

var Buttles : int;
private var myTransform : Transform;
private var chaseIs = false;
private var FollowingIsReady : boolean = false;
private var distanceToTarget : float = 0.0;

function Start () {
	yield WaitForSeconds(0.01);
      if (PlayerTarget == null ) {
         PlayerTarget = GameObject.FindWithTag("Player").transform;
     }
    myTransform = transform;
    IsFollowing = true;
}

function Update () {
	if(IsFollowing == true){
	distanceToTarget = Vector3.Distance(PlayerTarget.transform.position, transform.position);
	if(distanceToTarget <= searhRange){
		chaseIs = true;
		ChasePlayer();
	}
	if(myTransform == transform){
	var vectorToTarget : Vector3 = PlayerTarget.position - transform.position;
 	var angle :float = Mathf.Atan2(vectorToTarget.y, vectorToTarget.x) * Mathf.Rad2Deg;
 	var q :Quaternion = Quaternion.AngleAxis(angle, Vector3.forward);
 	transform.rotation = Quaternion.Slerp(transform.rotation, q, Time.deltaTime * speedRot);
	}
	}
}

function Shot(){
	
	yield WaitForSeconds(0.1);
	if(canFire == true){
		clone = Instantiate(Buttle, ShotSpawn.transform.position, ShotSpawn.transform.rotation);
		clone.transform.rotation = gameObject.transform.rotation;
		GetComponent.<AudioSource>().PlayOneShot(ShotSound, 0.7);
		canFire = false;
		yield WaitForSeconds (0.2);
		canFire = true;
	}
}

function ChasePlayer(){
if(transform.position.x >= PlayerTarget.position.x){	
	ForShot();
	}
	
	if(transform.position.x <= PlayerTarget.position.x){
	ForShot();
	}
}

function ForShot(){
	while(Buttles > 0){
		yield WaitForSeconds(2);
		Buttles--;
		Shot();
		}
	if(Buttles < 0){
		Buttles = 0;
	}
	if(Buttles == 0){
	yield WaitForSeconds(5);
	Buttles = ButtlesTotal;
	}
}