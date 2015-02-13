var Wait : float = 5;
var Scene : String;

function Update () {
	ChangeScene(); //To changing
}

function ChangeScene(){
	yield WaitForSeconds(Wait);
	Application.LoadLevel(Scene);
}