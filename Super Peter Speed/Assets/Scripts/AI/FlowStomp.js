var PlayerTarget : Transform;
var size = 21.72359;
var IsFollowing = false;
var searhRange : float = 15;
var AttackRange : float = 8;
var IsAwake = false;
var IsAttack = false;
var Pub : Transform;
var Pub2 : Transform;
var IsUp = false;
var SpeedUp = 5.0;
var A = false;
var IsDef = false;
var SoundStomp : AudioClip;

private var speedActual : float;
private var SpeedCurrent = 0;
private var distanceToTarget : float = 0.0;

function Awake(){
}

function Start () {
	yield WaitForSeconds (0.1);
	PlayerTarget = GameObject.FindWithTag ("Player").transform;
	IsFollowing = true;
}

function Update () {
	speedActual = GetComponent(Rigidbody2D).velocity.sqrMagnitude;
	
	if(!A){
	if(IsFollowing == true){
	distanceToTarget = Vector3.Distance(PlayerTarget.transform.position, transform.position);
		if(distanceToTarget <= searhRange){
			if(!IsAttack){
				IsAwake = true;
			}
		}else{
			if(distanceToTarget >= searhRange){
				if(!IsAttack){
					IsAwake = false;
				}
			}
		}
			if(distanceToTarget <= AttackRange){
				IsAttack = true;
		}
	}
	if(!IsAttack){
	if(IsAwake){
		GetComponent(Animator).Play("Awake");
	}else{
		GetComponent(Animator).Play("Sleep");
		}
	}
	if(IsAttack){
		Attack();
		}
	}
	
	if(A){
		if(IsUp){
			SpeedCurrent = SpeedUp;
			GetComponent(Rigidbody2D).velocity.y = SpeedCurrent;
			GetComponent(Animator).Play("Sleep");
		}
	}
}

function Attack(){
	SpeedCurrent = SpeedUp;
	GetComponent(Rigidbody2D).velocity.y = -SpeedCurrent;
	GetComponent(Animator).Play("Attack");
}

function OnCollisionEnter2D(col : Collision2D){
	var BlockH : float = col.contacts[0].point.y - Pub.position.y;
	var BlockH2 : float = col.contacts[0].point.y - Pub2.position.y;
	
	if(IsAttack){
		if(BlockH > 0){
			//GetComponent(Rigidbody2D).isKinematic = true;
			//GetComponent(AudioSource).PlayOneShot(SoundStomp , 0.7);
			yield WaitForSeconds(1.5);
			Up();
		}
	}
	
	if(IsUp){
		yield WaitForSeconds(0.5);
		if(speedActual == 0){
			//BlockH2 = 0;
			StatNormal();
		}
	}
	
}

function Up(){
	IsAttack = false;
	//GetComponent(Rigidbody2D).isKinematic = true;
	A = true;
	IsUp = true;
}

function StatNormal(){
	SpeedCurrent = 0;
	yield WaitForSeconds(1);
	IsAwake = true;
	A = false;
	//GetComponent(Rigidbody2D).isKinematic = true;
	IsUp = false;
}