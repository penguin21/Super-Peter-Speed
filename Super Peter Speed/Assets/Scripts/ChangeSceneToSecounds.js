var Wait : float = 5;
var Scene : String;
var LoadingIcon : GameObject;
var LoadingBar : GameObject;

function Update () {
	ChangeScene(); //To changing
}

function ChangeScene(){
	yield WaitForSeconds(Wait);
	LoadingBar.SetActive(true);
	asyncLevel();
}

function asyncLevel(){
	var async : AsyncOperation = Application.LoadLevelAsync(Scene);
	//Async is a bug
	     while (!async.isDone) {
         LoadingBar.GetComponent(LoadingGame).F = async.progress;
         yield;
     }
	Debug.Log("Loaded Scene");
}