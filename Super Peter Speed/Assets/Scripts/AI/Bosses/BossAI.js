var Player : GameObject;
var Health : int = 123;
var HealthMin : int = -341;
var BossIsReady : boolean = false;
var HitForButtle : int = 20;
var BossScript : String;
var BossEvent : GameObject;
var Deathing = false;
var DamageForPlayer : int = 40;
var SoundDeath : AudioClip;
var FaceDoor1 : GameObject;
var FaceDoor2 : GameObject;
var Door2 : GameObject;
var Door2End : Vector3;
var FaceDoorSprite : Sprite;

private var healthBarScript: HealthBar;

function Start () {
	healthBarScript = GetComponent("HealthBar");
	yield WaitForSeconds(0.01);
	Player = GameObject.FindWithTag("Player");
}

function Update () {
	if(healthBarScript.healthWidth < HealthMin){
		healthBarScript.healthWidth = HealthMin;
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
	
	if(other.gameObject.tag == "Player"){
		Player.GetComponent(HealthBar).healthWidth -= DamageForPlayer;
		Player.GetComponent(PlayerAI).IsHit();
		}
}

function Death(){
		gameObject.GetComponent(BossScript).enabled = false;
		gameObject.GetComponent(Animator).SetBool("Stand", false);
		gameObject.GetComponent(Animator).SetBool("Walk", false);
		gameObject.GetComponent(Animator).SetBool("Death", true);
		gameObject.GetComponent(BoxCollider2D).enabled = false;
		audio.PlayOneShot(SoundDeath);
		Deathing = true;
		yield WaitForSeconds(5);
		FaceDoor1.GetComponent(SpriteRenderer).sprite = FaceDoorSprite;
		FaceDoor2.GetComponent(SpriteRenderer).sprite = FaceDoorSprite;
		Door2.GetComponent(ToEnd).startTime = 9.87;
		Door2.GetComponent(ToEnd).endPoint = Door2End;
		gameObject.GetComponent(HealthBar).enabled = false;
		yield WaitForSeconds(10);
		gameObject.SetActive(false);
}