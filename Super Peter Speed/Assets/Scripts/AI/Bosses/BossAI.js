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
var goldBurgerPiece : GameObject;
var CameraPlayer : GameObject;
var SpawnerObj : GameObject;

private var healthBarScript: HealthBar;

function Start () {
	healthBarScript = GetComponent("HealthBar");
	yield WaitForSeconds(0.01);
	Player = GameObject.FindWithTag("Player");
	CameraPlayer = GameObject.FindWithTag("MainCamera");
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
		Destroy(SpawnerObj);
		gameObject.GetComponent(BossScript).enabled = false;
		gameObject.GetComponent(Animator).SetBool("Stand", false);
		gameObject.GetComponent(Animator).SetBool("Walk", false);
		gameObject.GetComponent(Animator).SetBool("Death", true);
		gameObject.GetComponent(BoxCollider2D).enabled = false;
		GetComponent.<AudioSource>().PlayOneShot(SoundDeath);
		Deathing = true;
		yield WaitForSeconds(5);
		FaceDoor1.GetComponent(SpriteRenderer).sprite = FaceDoorSprite;
		FaceDoor2.GetComponent(SpriteRenderer).sprite = FaceDoorSprite;
		goldBurgerPiece.SetActive(true);
		gameObject.GetComponent(HealthBar).enabled = false;
		CameraPlayer.GetComponent(AudioSource).GetComponent.<AudioSource>().Stop();
		yield WaitForSeconds(10);
		gameObject.SetActive(false);
}