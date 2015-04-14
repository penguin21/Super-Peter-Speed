#pragma strict

var pauseGame : boolean = false;
var CameraObj : GameObject;
var Player : GameObject;

function Start(){
	CameraObj = GameObject.FindWithTag ("MainCamera");
	Player = GameObject.FindWithTag ("Player");
}

function Update()
{	
	if(!CameraObj){
		CameraObj = GameObject.FindWithTag ("MainCamera");
	}
	
	if(!Player){
		Player = GameObject.FindWithTag ("Player");
	}
	
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
		if(Application.systemLanguage.English){
		if(GUI.Button (Rect(Screen.width/2 - 50, Screen.height/2.17, 165, 30), "Resume")) {
	        pauseGame = false;
	        //Resume the Game
	    }
	    }else if(Application.systemLanguage.Spanish){
	    if(GUI.Button (Rect(Screen.width/2 - 50, Screen.height/2.17, 165, 30), "Continuar")) {
	        pauseGame = false;
	        //Resume the Game
	    }
	    }
	    
	    if(GUI.Button (Rect(Screen.width/2 - 50, Screen.height/1.8, 165, 30), "Return to Main Menu")) {
	        Time.timeScale = 1;
	        Destroy(Player);
	        Application.LoadLevel("MainMenu");
	        Destroy(gameObject);
	        //Return to Main Menu
	   	 }
	   	 
	   	  if(GUI.Button (Rect(Screen.width/2 - 50, Screen.height/1.6, 165, 30), "Quit Game")) {
	        Application.Quit();
	        //Quit the Game
	   	 }
	 }
}