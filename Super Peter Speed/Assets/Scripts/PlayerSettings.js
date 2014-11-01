var PlayersNumber : int = 0;
var Player0 : GameObject;
var Player3 : GameObject;
var spawnPoint : Transform;
var CanRespawn : boolean = true;
var CameraObj : GameObject;

private var csScript : SmoothCamera2D;  
   
function Awake()  
{  
    //Get the CSharp Script  
    csScript = this.GetComponent("SmoothCamera2D"); //Don't forget to place the 'CSharp1' file inside the 'Standard Assets' folder  
}  
   

function Start () {
	CameraObj = GameObject.FindWithTag ("MainCamera");
}

function Update () {
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