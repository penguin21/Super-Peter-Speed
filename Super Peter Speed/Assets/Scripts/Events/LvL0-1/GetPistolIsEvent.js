var DoorR : ToEnd;
var DoorRObj : Transform;
var Secounds = 5.0;
var Player : GameObject;
var AnimPlayer : Animator;
var Arms : GameObject;
var Cam : GameObject;
private var PlayerScript : Platformer2DUserControl;
private var CamScript : SmoothCamera2D;

function Awake()  
{  
    //Get the Script C#  
   	PlayerScript = this.GetComponent("Platformer2DUserControl");
   	CamScript = this.GetComponent("SmoothCamera2D");
}  

function Start(){
	Arm = GameObject.FindWithTag ("Arm");
	Player = GameObject.FindWithTag ("Player");
	AnimPlayer = Player.GetComponent("Animator");
	Cam = GameObject.FindWithTag("MainCamera");
}

function DoorIsActived(){
	DoorR.enabled = true;
	yield WaitForSeconds(Secounds);
	Cam.GetComponent(SmoothCamera2D).target = Player.transform;
	Player.GetComponent(Platformer2DUserControl).enabled = true;
	Arms.SetActive(true);
}

function OnTriggerEnter2D(other : Collider2D){
		if(other.gameObject.tag == "Player"){
			Player.GetComponent(Platformer2DUserControl).enabled = false;
			Arms.SetActive(false);
			AnimPlayer.SetFloat("Speed", 0.0);
			Cam.GetComponent(SmoothCamera2D).target = DoorRObj;
			DoorIsActived();
		}
}