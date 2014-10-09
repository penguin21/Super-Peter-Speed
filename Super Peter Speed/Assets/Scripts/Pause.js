var IsPause : boolean = false;
var Menu : boolean = false;

function Start () {
IsPause = false;
}

function Update () {

	if(IsPause == true){
		Time.timeScale = 0.0;
		IsPause = true;
		Menu = true;
	}
	
	if(IsPause == false){
		Time.timeScale = 1.0;
		IsPause = false;
		Menu = false;
	}
}

function OnGUI(){


}