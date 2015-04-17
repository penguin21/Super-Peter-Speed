var LevelT : Transform;
var IsEditor = true;

function Start () {

}

function Update () {

}

function DeleteAllObjects(){
	 for (var child : Transform in LevelT){
     GameObject.Destroy(child.gameObject);
 	 }	
}