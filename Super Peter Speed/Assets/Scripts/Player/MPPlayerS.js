private var PlayerScript : Platformer2DUserControl;
private var PlayerScriptAnims : PlatformerCharacter2D;

function Awake(){
	PlayerScript = this.GetComponent("Platformer2DUserControl");
	PlayerScriptAnims = this.GetComponent("PlatformerCharacter2D");
}

function Start () {
	GetComponent(Platformer2DUserControl).enabled = true;
	GetComponent(PlatformerCharacter2D).enabled = true;
	GetComponent(PlayerAI).enabled = true;
	GetComponent(MainCode).enabled = true;
	GetComponent(HealthBar).enabled = true;
	GetComponent(CrounchDetection).enabled = true;
	GetComponent(Swimg).enabled = true;
	Debug.Log("All is actived");
}

function Update () {

}