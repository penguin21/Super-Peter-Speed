var PlayersNumber : int = 0;
var Player0 : GameObject;
var Player3 : GameObject;
var spawnPoint : Transform;
var CanRespawn : boolean = true;

function Start () {

}

function Update () {
	if(PlayersNumber == 0 && CanRespawn == true){
		CanRespawn = false;
		Instantiate (Player0, spawnPoint.transform.position, spawnPoint.transform.rotation);
	}
}