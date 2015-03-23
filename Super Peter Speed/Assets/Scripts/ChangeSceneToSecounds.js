var Wait : float = 5;
var Scene : String;
var LoadingIcon : GameObject;

function Update () {
	ChangeScene(); //To changing
}

function ChangeScene(){
	yield WaitForSeconds(Wait);
	if(LoadingIcon == null){
		//nothing
	}
	else
	{
		LoadingIcon.SetActive(true);
	}
	asyncLevel();
}

function asyncLevel(){
	var async : AsyncOperation = Application.LoadLevelAsync(Scene);
	
	yield async;
	Debug.Log("Loaded Scene");
}