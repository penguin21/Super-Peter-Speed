var Player : GameObject;

function Start(){
	yield WaitForSeconds (0.01);
	Player = GameObject.FindWithTag ("Player");
}

function Awake () {
	DontDestroyOnLoad (transform.gameObject);
}