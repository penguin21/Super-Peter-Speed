var SpeedCam : float = 5;
var Secounds : float = 125;
var SceneToChange : String;

function Update () {
	CameraCredits();
}

function CameraCredits(){
	transform.Translate(Vector3(0,-SpeedCam,0) * Time.deltaTime);
	yield WaitForSeconds(Secounds);
	Application.LoadLevel(SceneToChange);
}