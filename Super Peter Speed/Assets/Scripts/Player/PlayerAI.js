﻿var PointSoundEffect : AudioClip;
var BrickBreakSoundEffect : GameObject;
var BrickParticles : GameObject;
var anim : Animator;
var PlayerObj : GameObject;
var KeySoundEffect : AudioClip;
var GUIKey : GameObject;
var PoisionSound : AudioClip;
var HealthPotionSound : AudioClip;
var HurtPlayerSound : AudioClip;

private var PlayerScript : Platformer2DUserControl;
private var PlayerScriptAnims : PlatformerCharacter2D;
private var Arm : GameObject;
private var healthBarScript: HealthBar;

function Awake()  
{  
    //Get the Script C#  
   	PlayerScript = this.GetComponent("Platformer2DUserControl");
   	PlayerScriptAnims = this.GetComponent("PlatformerCharacter2D");
}  

function Start () {
	Arm = GameObject.FindWithTag ("Arm");
	healthBarScript = GetComponent("HealthBar");
	MainCode.Key = 0;
	MainCode.Score = 0;
	healthBarScript.healthWidth = 231;
}

function Update () {
	if(healthBarScript.healthWidth < -22){
		healthBarScript.healthWidth = -22;
	}
	
	if(healthBarScript.healthWidth > 231){
		healthBarScript.healthWidth = 231;
	}
	
	if(healthBarScript.healthWidth == -22){
		IsDeath();
	}
}

function OnTriggerEnter2D(other : Collider2D){
	if(other.gameObject.tag == "Point"){
		MainCode.Score += 10;
		audio.clip = PointSoundEffect;
		audio.Play();
		Destroy(other.gameObject); //Get a point
	}
	
	if(other.gameObject.tag == "Fall Death"){
		anim.SetBool("Death",true);
		yield WaitForSeconds (0.3);
		MainCode.Score = 0;
		MainCode.Heart = MainCode.MaxHeart;
		Application.LoadLevel(Application.loadedLevel); //Restart Level
	}
}

function OnCollisionEnter2D(other : Collision2D){
	if(other.gameObject.tag == "Brick"){
		Instantiate(BrickBreakSoundEffect, transform.position + Vector3(0, 0, 0), Quaternion.Euler(0,0,0) );		
		Instantiate(BrickParticles, transform.position + Vector3(0, 0, 0), Quaternion.Euler(0,0,0) );
		Destroy(other.gameObject);
	}
		
		if(other.gameObject.tag == "Health Potion"){
		healthBarScript.healthWidth += 12;
		audio.clip = HealthPotionSound;
		audio.Play();
		if(MainCode.Heart >= MainCode.MaxHeart){
			}
		Destroy(other.gameObject);
		}
		
		if(other.gameObject.tag == "Poision Potion"){
		healthBarScript.healthWidth -= 12;
		Destroy(other.gameObject);
		audio.clip = PoisionSound;
		audio.Play();
		}
		
		if(other.gameObject.tag == "Key"){
		MainCode.Key += 1;
		GUIKey.SetActive(true);
		audio.PlayOneShot(KeySoundEffect);
		Destroy(other.gameObject);
		}
		
		if(other.gameObject.tag == "Enemy"){
		healthBarScript.healthWidth -= 20;
		anim.Play("Hit");
		audio.PlayOneShot(HurtPlayerSound);
		}
		
		if(MainCode.Heart <= 0){
			Application.LoadLevel(Application.loadedLevel);
			}
}

function IsDeath(){
	anim.Play("DeathBy");
	PlayerObj.GetComponent(Platformer2DUserControl).enabled = false;
	PlayerObj.GetComponent(PlatformerCharacter2D).enabled = false;
	Arm.SetActive(false);
	PlayerObj.tag = "Untagged";
	yield WaitForSeconds(2.5);
	Application.LoadLevel(Application.loadedLevel);
}
