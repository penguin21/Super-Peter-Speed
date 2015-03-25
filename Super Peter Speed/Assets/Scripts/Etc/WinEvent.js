var MusicWin : AudioClip;
var CameraObj : GameObject;

function Start () {
	CameraObj = GameObject.FindGameObjectWithTag("MainCamera");
}

function Update () {

}

function OnTriggerEnter2D(other : Collider2D){
	if(other.gameObject.tag == "Player"){
		WinLevel();
	}
}

function WinLevel(){
	CameraObj.GetComponent.<AudioSource>().clip = MusicWin;
	CameraObj.GetComponent.<AudioSource>().loop = false;
	CameraObj.GetComponent.<AudioSource>().Play();
}