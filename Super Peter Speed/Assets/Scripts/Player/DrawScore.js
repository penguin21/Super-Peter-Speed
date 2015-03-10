var text : GUIText;

function OnGUI(){
	GetComponent.<GUIText>().text = "Score:" + MainCode.Score;
}

function Update(){
	if(Screen.fullScreen == true){
	
	}
}