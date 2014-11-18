var Player : GameObject;
var Health : int = 123;
var HealthMin : int = -341;
var BossIsReady : boolean = false;
var HitForButtle : int = 20;
var BossScript : MonoScript;
var BossEvent : GameObject;
var Deathing = false;

private var healthBarScript: HealthBar;

function Start () {
	healthBarScript = GetComponent("HealthBar");
	yield WaitForSeconds(0.01);
	Player = GameObject.FindWithTag("Player");
}

function Update () {
	if(healthBarScript.healthWidth < HealthMin){
		Death();
	}
	
	if(healthBarScript.healthWidth > Health){
		healthBarScript.healthWidth = Health;
	}
}
function OnCollisionEnter2D(other : Collision2D){
	if(other.gameObject.tag == "Buttle"){
		healthBarScript.healthWidth -= HitForButtle;
		}
	}


function Death(){
		gameObject.GetComponent(Animator).SetBool("Death", true);
		Deathing = true;
		yield WaitForSeconds(5);
		gameObject.SetActive(false);
}