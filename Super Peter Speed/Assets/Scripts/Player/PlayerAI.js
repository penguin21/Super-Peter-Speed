var PointSoundEffect : AudioClip;
var BrickBreakSoundEffect : GameObject;
var BrickParticles : GameObject;
var anim : Animator;
var PlayerObj : GameObject;
var KeySoundEffect : AudioClip;
var KeyTexture : Texture2D;
var PoisionSound : AudioClip;
var HealthPotionSound : AudioClip;
var HurtPlayerSound : AudioClip;
var textTime : String;
var FontGUI : Font;
var key = false;
var IsSwiming : boolean = false;
var ForSwiming : boolean = true;
var Respawn : Transform;
var IsArm : boolean = true;
var IsDeathing : boolean = false;
var JumpSound : AudioClip;
var InfectedTotal = 5;
var IsInfected = true;
var IsPrin = false;

//Key
var KW : int = 60;
var KH : int = 60;
var TK : float = 10;

private var JumpSoundIs = true;
private var InfectedIntents : int = 0;
private var startTime : float;
private var PlayerScript : Platformer2DUserControl;
private var PlayerScriptAnims : PlatformerCharacter2D;
var Arm : GameObject;
private var healthBarScript: HealthBar;
var IsDeath1 : boolean = false;

function Awake()  
{  
    //Get the Script C#  
   	PlayerScript = this.GetComponent("Platformer2DUserControl");
   	PlayerScriptAnims = this.GetComponent("PlatformerCharacter2D");
}  

function Start () {

	startTime = Time.time;
	if(IsArm == true){
	Arm = GameObject.FindWithTag ("Arm");
	}
	healthBarScript = GetComponent("HealthBar");
	MainCode.Key = 0;
	MainCode.Score = 0;
	healthBarScript.healthWidth = 231;
	Respawn = GameObject.FindWithTag ("Spawn").transform;
	if(IsPrin == true){
		Arm.SetActive(false);
	}
}

function Update () {
	if(JumpSoundIs == true){
	if(Input.GetButtonDown("Jump")){
		 if(!GetComponent.<AudioSource>().isPlaying){
     
             GetComponent.<AudioSource>().PlayOneShot(JumpSound, 0.7);
             }
		}
	}	
	
	if(anim.GetBool("Ground")){
		JumpSoundIs = true;
	}
	else
	{
		JumpSoundIs = false;
	}
	
	if(healthBarScript.healthWidth < -22){
		healthBarScript.healthWidth = -22;
	}
	
	if(healthBarScript.healthWidth > 231){
		healthBarScript.healthWidth = 231;
	}
	
	if(healthBarScript.healthWidth == -22){
		IsDeath();
	}
	
	if(IsDeath1 == true){
		anim.SetBool("Death", true);
		PlayerObj.GetComponent(Platformer2DUserControl).enabled = false;
		PlayerObj.GetComponent(PlatformerCharacter2D).enabled = false;
		PlayerObj.GetComponent(Swimg).enabled = false;
		if(IsArm == true){
		Arm.SetActive(false);
		}
		PlayerObj.tag = "Untagged";
		WaitForSeconds(2.5);
		healthBarScript.healthWidth = 231;
		gameObject.transform.position = Respawn.transform.position;
		IsDeath1 = false;
		IsDeating = true;
	}
	if(IsDeathing == true){
		if(IsDeath1 == false){
			anim.SetBool("Death", false);
			anim.SetFloat("Speed", 0.0);
			PlayerObj.GetComponent(PlatformerCharacter2D).enabled = true;
			PlayerObj.GetComponent(Swimg).enabled = true;
			if(IsArm == true){
			Arm.SetActive(true);
			}
			PlayerObj.tag = "Player";
			WaitForSeconds(0.01);
			IsDeating = false;
			PlayerObj.GetComponent(Platformer2DUserControl).enabled = true;
		}
	}
	
	if(ForSwiming == true){
		if(IsSwiming == true){
			PlayerObj.GetComponent(PlatformerCharacter2D).enabled = false;
			gameObject.GetComponent(Swimg).IsSwimg = true;
		}
	
		if(IsSwiming == false){
			PlayerObj.GetComponent(PlatformerCharacter2D).enabled = true;
			PlayerObj.GetComponent(Swimg).IsSwimg = false;
			PlayerObj.GetComponent.<Rigidbody2D>().gravityScale = 3;
			PlayerObj.GetComponent.<Rigidbody2D>().drag = 0.42;
		}
	}
}

function OnTriggerEnter2D(other : Collider2D){
	if(other.gameObject.tag == "Point"){
		MainCode.Score += 10;
		GetComponent.<AudioSource>().clip = PointSoundEffect;
		GetComponent.<AudioSource>().Play();
		Destroy(other.gameObject); //Get a point
	}
	
	if(other.gameObject.tag == "Fall Death"){
		anim.SetBool("Death",true);
		yield WaitForSeconds (0.3);
		anim.SetBool("Death",false);
		IsDeath();
	}
}

function OnTriggerStay2D(other : Collider2D){
	if(other.gameObject.tag == "Water"){
		//IsSwiming = true;
	}
}


function OnTriggerExit2D(other : Collider2D){
	if(other.gameObject.tag == "Water"){
		//IsSwiming = false;
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
		GetComponent.<AudioSource>().clip = HealthPotionSound;
		GetComponent.<AudioSource>().Play();
		if(MainCode.Heart >= MainCode.MaxHeart){
			}
		Destroy(other.gameObject);
		}
		
		if(other.gameObject.tag == "Poision Potion"){
		healthBarScript.healthWidth -= 12;
		Destroy(other.gameObject);
		GetComponent.<AudioSource>().clip = PoisionSound;
		GetComponent.<AudioSource>().Play();
		}
		
		if(other.gameObject.tag == "Key"){
		MainCode.Key += 1;
		GetComponent.<AudioSource>().PlayOneShot(KeySoundEffect);
		Destroy(other.gameObject);
		}
		
		if(other.gameObject.tag == "Enemy"){
		healthBarScript.healthWidth -= 20;
		anim.Play("Hit");
		GetComponent.<AudioSource>().PlayOneShot(HurtPlayerSound);
		}
		if(IsInfected == true){
		if(other.gameObject.tag == "InfectedEnemy"){
		healthBarScript.healthWidth -= 20;
		anim.Play("Hit");
		GetComponent.<AudioSource>().PlayOneShot(HurtPlayerSound);
		InfectedIntents = InfectedTotal;
		IsInfected = false;
		other.transform.tag = "Enemy";
		Infected();
			}
		}
		
		if(MainCode.Heart <= 0){
			Application.LoadLevel(Application.loadedLevel);
			}
}

function OnCollisionStay2D(other : Collision2D){
	JumpSoundIs = true;
}

function OnCollisionExit2D(other : Collision2D){
	JumpSoundIs = false;
}

function OnGUI () {
var guiTime = Time.time - startTime; 
//The gui-Time is the difference between the actual time and the start time.
var minutes : int = guiTime / 60; //Divide the guiTime by sixty to get the minutes.
var seconds : int = guiTime % 60;//Use the euclidean division for the seconds.
var fraction : int = (guiTime * 100) % 100;
 
 GUI.skin.font = FontGUI;
 
 textTime = String.Format ("{0:00}:{1:00}:{2:00}", minutes, seconds, fraction); 
 
 GUI.Label (Rect (10, 8, 200, 30), "Time: " + textTime);
 GUI.Label (Rect (10, 70, 200, 30), "Score: " + MainCode.Score);
 
 if(MainCode.Key == 1){
 	key = true;
 }
  
  if(MainCode.Key == 0){
 	key = false;
 }
 
 if(key){
 		if(!KeyTexture){
			Debug.LogError("What!!!!! Error.Please assing Texture.");
			return;
		}
		GUI.DrawTexture(Rect(10,KH,KW,60), KeyTexture, ScaleMode.ScaleToFit, true, TK);
 }
 
}

function IsDeath(){
		anim.SetBool("DeathBy",true);
		PlayerObj.GetComponent(Platformer2DUserControl).enabled = false;
		PlayerObj.GetComponent(PlatformerCharacter2D).enabled = false;
		PlayerObj.GetComponent(Swimg).enabled = false;
		InfectedIntents = 0;
		if(IsArm == true){
		Arm.SetActive(false);
		}
		PlayerObj.tag = "Untagged";
		yield WaitForSeconds(2.5);
		healthBarScript.healthWidth = 231;
		gameObject.transform.position = Respawn.transform.position;
		anim.SetBool("DeathBy",false);
		anim.SetFloat("Speed", 0.0);
		PlayerObj.GetComponent(PlatformerCharacter2D).enabled = true;
		PlayerObj.GetComponent(Platformer2DUserControl).enabled = true;
		PlayerObj.GetComponent(Swimg).enabled = true;
		if(IsArm == true){
		Arm.SetActive(true);
		}
		PlayerObj.tag = "Player";
}

function IsHit(){
		anim.Play("Hit");
		GetComponent.<AudioSource>().PlayOneShot(HurtPlayerSound);
		yield WaitForSeconds(0.5);
		anim.SetFloat("Speed", 0.0);
}

function Infected(){
	if(IsInfected == false){
	while(InfectedIntents > 0){
		yield WaitForSeconds(4);
		healthBarScript.healthWidth -= 5;
		GetComponent.<AudioSource>().PlayOneShot(HurtPlayerSound);
		InfectedIntents--;
		}
	}
	if(InfectedIntents == 0){
		IsInfected = true;
	}
}

function OnlyPrin(){
	Arm.SetActive(true);
}