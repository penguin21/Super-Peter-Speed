var LevelT : Transform;

function Start () {

}

function Update () {

}

function DeleteAllObjects(){
	 for (var child : Transform in LevelT){
     GameObject.Destroy(child.gameObject);
 	 }	
}