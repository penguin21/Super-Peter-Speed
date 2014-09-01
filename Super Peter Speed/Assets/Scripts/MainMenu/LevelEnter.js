var LevelTo : String;

function Start () {

}

function Update () {

}

function OnTriggerStay2D(other : Collider2D){
	if(other.gameObject.tag == "WorldCam"){
		if(Input.GetButton("Attack")){
		Application.LoadLevel(LevelTo);
		}
	}
}