var MusicWin : AudioClip;
var CameraObj : GameObject;

private var IsWin = false;

function Start () {
	CameraObj = GameObject.FindGameObjectWithTag("MainCamera");
}

function Update () {

}

function OnTriggerEnter2D(other : Collider2D){
	if(other.gameObject.tag == "Player"){
	if(IsWin == false){	
		IsWin = true;
		WinLevel();
		}
	}
}

function WinLevel(){
	CameraObj.GetComponent.<AudioSource>().clip = MusicWin;
	CameraObj.GetComponent.<AudioSource>().loop = false;
	CameraObj.GetComponent.<AudioSource>().Play();
}