var LevelT : Transform;
var IsEditor = true;
var MenuGUI : GameObject;

private var menu = false;

function Start () {

}

function Update () {

}

function DeleteAllObjects(){
	 for (var child : Transform in LevelT){
     GameObject.Destroy(child.gameObject);
 	 }	
}

function MenuSet(){

}

function PanelNew (Panel : GameObject){
	Panel.SetActive(true);
}

function PanelOld(Panel : GameObject){
	Panel.SetActive(false);
}