var LevelName : String;
var Player : GameObject;
var CameraM : GameObject;
var IsDestroyCamera : boolean = false;

function Start(){
	yield WaitForSeconds (0.01);
	Player = GameObject.FindWithTag ("Player");
}

function OnTriggerStay2D(other : Collider2D){
	if(other.gameObject.tag == "Player"){	
		if(Input.GetButtonDown("Interact")){
			DontDestroyOnLoad (Player);
			if(IsDestroyCamera == false){
				DontDestroyOnLoad (CameraM);
			}
			Application.LoadLevel(LevelName);
		}
	}
}