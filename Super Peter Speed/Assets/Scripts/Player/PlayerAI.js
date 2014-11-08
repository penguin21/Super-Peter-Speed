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


//Key
var KW : int = 60;
var KH : int = 60;
var TK : float = 10;

private var startTime : float;
private var PlayerScript : Platformer2DUserControl;
private var PlayerScriptAnims : PlatformerCharacter2D;
var Arm : GameObject;
private var healthBarScript: HealthBar;
private var IsDeath : boolean = false;

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
}

function Update () {
	
	if(healthBarScript.healthWidth < -22){
		healthBarScript.healthWidth = -22;
	}
	
	if(healthBarScript.healthWidth > 231){
		healthBarScript.healthWidth = 231;
	}
	
	if(healthBarScript.healthWidth == -22){
		IsDeath = true;
	}
	
	if(IsDeath == true){
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
		IsDeath = false;
	}
	
	if(IsDeath == false){
		anim.SetBool("Death", false);
		anim.SetFloat("Speed", 0.0);
		PlayerObj.GetComponent(Platformer2DUserControl).enabled = true;
		PlayerObj.GetComponent(PlatformerCharacter2D).enabled = true;
		PlayerObj.GetComponent(Swimg).enabled = true;
		if(IsArm == true){
		Arm.SetActive(true);
		}
		PlayerObj.tag = "Player";
	}
	
	if(ForSwiming == true){
		if(IsSwiming == true){
			PlayerObj.GetComponent(PlatformerCharacter2D).enabled = false;
			gameObject.GetComponent(Swimg).IsSwimg = true;
		}
	
		if(IsSwiming == false){
			PlayerObj.GetComponent(PlatformerCharacter2D).enabled = true;
			PlayerObj.GetComponent(Swimg).IsSwimg = false;
			PlayerObj.rigidbody2D.gravityScale = 3;
			PlayerObj.rigidbody2D.drag = 0.42;
		}
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
		gameObject.transform.position = Respawn.transform.position; //Restart Level
	}
}

function OnTriggerStay2D(other : Collider2D){
	if(other.gameObject.tag == "Water"){
		IsSwiming = true;
	}
}


function OnTriggerExit2D(other : Collider2D){
	if(other.gameObject.tag == "Water"){
		IsSwiming = false;
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