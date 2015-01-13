#pragma strict

var pauseGame : boolean = false;
var CameraObj : GameObject;

function Start(){
	CameraObj = GameObject.FindWithTag ("MainCamera");
}

function Update()
{	
	if(Input.GetKeyDown("escape"))
	{
		pauseGame = !pauseGame;
		
    	if(pauseGame == true)
    	{
    		Time.timeScale = 0;
    		pauseGame = true;
 
    	}
    }
    
    if(pauseGame == false)
    {
    	Time.timeScale = 1;
    	pauseGame = false;
 		
    }
}

function OnGUI() {
if(pauseGame == true){
		GUI.Box(Rect(Screen.width/2 - 60, Screen.height/2.3, 200, 230),"Pause Menu");
		if(GUI.Button (Rect(Screen.width/2 - 50, Screen.height/2.17, 165, 30), "Resume")) {
	        pauseGame = false;
	        //Resume the Game
	    	 }
	 }
}