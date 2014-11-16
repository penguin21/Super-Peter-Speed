var LevelName : String;
var Player : GameObject;
var CameraM : GameObject;
var IsDestroyCamera : boolean = false;
var Pause : GameObject;

function Start(){
	Pause = GameObject.FindWithTag ("Pause");
	yield WaitForSeconds (0.01);
	Player = GameObject.FindWithTag ("Player");
}

function OnTriggerStay2D(other : Collider2D){
	if(other.gameObject.tag == "Player"){	
		if(Input.GetButtonDown("Interact")){
			DontDestroyOnLoad (Player);
			DontDestroyOnLoad(Pause);
			if(IsDestroyCamera == false){
				DontDestroyOnLoad (CameraM);
			}
			Application.LoadLevel(LevelName);
		}
	}
}