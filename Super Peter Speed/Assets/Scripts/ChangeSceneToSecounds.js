var Wait : float = 5;
var SceneToChange : String;

function Update () {
	ChangeScene(); //To changing
}

function ChangeScene(){
	yield WaitForSeconds(Wait);
	Application.LoadLevel(SceneToChange);
}