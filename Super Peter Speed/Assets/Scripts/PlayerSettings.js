var PlayersNumber : int = 0;
var Player0 : GameObject;
var Player3 : GameObject;
var spawnPoint : Transform;
var CanRespawn : boolean = true;
var CameraObj : GameObject;
var IsPlayerIsWarp : boolean = false;
var PlayerOnWarpObj : GameObject;
var SpawnWarp : Transform;

private var SpawnW : boolean = false;

private var csScript : SmoothCamera2D;  
   
function Awake()  
{  
    //Get the CSharp Script  
    csScript = this.GetComponent("SmoothCamera2D"); //Don't forget to place the 'CSharp1' file inside the 'Standard Assets' folder  
}  
   

function Start () {
	CameraObj = GameObject.FindWithTag ("MainCamera");
	if(IsPlayerIsWarp == true){
		PlayerOnWarpObj = GameObject.FindWithTag ("Player");
		Warping();
	}
}

function Update () {
	if(IsPlayerIsWarp == false){
	if(PlayersNumber == 0 && CanRespawn == true){
		CanRespawn = false;
		Instantiate (Player0, spawnPoint.transform.position, spawnPoint.transform.rotation);
		WaitForSeconds(1);
		CameraObj.GetComponent(SmoothCamera2D).enabled = true;
	}
	
	if(PlayersNumber == 3 && CanRespawn == true){
		CanRespawn = false;
		Instantiate (Player3, spawnPoint.transform.position, spawnPoint.transform.rotation);
		WaitForSeconds(1);
		CameraObj.GetComponent(SmoothCamera2D).enabled = true;	
		}
	}
}

function Warping(){
	PlayerOnWarpObj.transform.position = SpawnWarp.transform.position;
	PlayerOnWarpObj.GetComponent(PlayerAI).Respawn = SpawnWarp;
	CameraObj.GetComponent(SmoothCamera2D).enabled = true;
}