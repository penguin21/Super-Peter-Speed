var BossDoor1 : GameObject;
var BossDoors2 : GameObject;
var TimeForClose : float = 5;
var IsEventIs : boolean = false;
var IsB1 : boolean = false;
var IsB2 : boolean = false;
var IsBossBattle : boolean = false;
var B1T : Transform;
var B2T : Transform;
var B1S : Transform;
var B2S : Transform;
var B1F : GameObject;
var B2F : GameObject;
var Player : GameObject;
var Arm : GameObject;
var BFNew : Sprite;

var CameraPlayer : GameObject;
private var startTime : float;
private var journeyLength: float;
private var prepare : boolean = false;
private var PlayerScript : Platformer2DUserControl;
private var PlayerScriptAnims : PlatformerCharacter2D;
private var CameraP : SmoothCamera2D;

function Awake()  
{  
    //Get the Script C#  
   	PlayerScript = this.GetComponent("Platformer2DUserControl");
   	PlayerScriptAnims = this.GetComponent("PlatformerCharacter2D");
   	CameraP = this.GetComponent("SmoothCamera2D");
}

function Start() {
	yield WaitForSeconds(0.01);
	Player = GameObject.FindWithTag("Player");
	Arm = GameObject.FindWithTag("Arm");
	CameraPlayer = GameObject.FindWithTag("MainCamera");
}

function Update(){
	if(prepare == true){
		EventIsReady();
		}
}

function OnTriggerStay2D(other : Collider2D){
	if(other.gameObject.tag == "Player"){
		IsEventIs = true;
		prepare = true;
		gameObject.GetComponent(BoxCollider2D).enabled = false;
	}
}

function EventIsReady(){
if(IsEventIs == true){
	IsB1 = true;
	if(IsB1 == true){
		Player.GetComponent(Platformer2DUserControl).enabled = false;
		Player.GetComponent(PlatformerCharacter2D).enabled = false;
		Player.GetComponent(Animator).SetFloat("Speed", 0.0);
		Arm.SetActive(false);
		CameraPlayer.GetComponent(SmoothCamera2D).target = B1T;
		BossDoor1.GetComponent(ToEnd).enabled = true;
		yield WaitForSeconds(TimeForClose);
		IsB2 = true;
		IsB1 = false;
		}
		if(IsB2 == true){
		B1T.transform.position = B2T.transform.position;
		BossDoors2.GetComponent(ToEnd).enabled = true;
		yield WaitForSeconds(TimeForClose);
		IsBossBattle = true;
		IsB2 = false;
		IsEventIs = false;
		}
	}
	if(IsBossBattle == true){
		CameraPlayer.GetComponent(SmoothCamera2D).target = Player.transform;
		yield WaitForSeconds(0.5);
		B1F.GetComponent(SpriteRenderer).sprite = BFNew;
		B2F.GetComponent(SpriteRenderer).sprite = BFNew;
		Player.GetComponent(Platformer2DUserControl).enabled = true;
		Player.GetComponent(PlatformerCharacter2D).enabled = true;
		Arm.SetActive(true);
	}
}