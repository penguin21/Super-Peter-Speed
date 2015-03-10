var Pause : GameObject;
var MainCam : GameObject;

function Start () {

}

function Update () {
	if(Input.GetKeyDown("escape")){
	Time.timeScale = 1.0;
	Pause.SetActive(false);
	MainCam.GetComponent(AudioSource).GetComponent.<AudioSource>().Play();
	}
}