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
    while (async.isDone) {
    	async.allowSceneActivation = false;
    	yield WaitForSeconds(0.5);
    	async.allowSceneActivation = true;
    }
    
	Debug.Log("Loaded Scene");
}