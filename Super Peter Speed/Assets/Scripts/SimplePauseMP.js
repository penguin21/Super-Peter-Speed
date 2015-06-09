#pragma strict

var pauseGame : boolean = false;
var CameraObj : GameObject;
var Player : GameObject;

private var PlayerScript : Platformer2DUserControl;
private var PlayerScriptAnims : PlatformerCharacter2D;
private var h = false;

function Awake(){
	if(Player){
		PlayerScript = this.GetComponent("Platformer2DUserControl");
		PlayerScriptAnims = this.GetComponent("PlatformerCharacter2D");
	}
}

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
    		pauseGame = true;
			CameraObj.GetComponent(AudioSource).Pause();
			h = true;
			if(Player){
				Player.GetComponent(Animator).SetFloat("Speed", 0.0);
				Player.GetComponent(Animator).SetFloat("vSpeed", 0.0);
				Player.GetComponent(Platformer2DUserControl).enabled = false;
				Player.GetComponent(PlatformerCharacter2D).enabled = false;
			}
    	}
    }
    
    if(pauseGame == false)
    {
    	pauseGame = false;
    	if(h == true){
    		PlayMusic();
    	}
   		if(Player){
				Player.GetComponent(Platformer2DUserControl).enabled = true;
				Player.GetComponent(PlatformerCharacter2D).enabled = true;
			}
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

function PlayMusic(){
	CameraObj.GetComponent(AudioSource).Play();
	h = false;
}