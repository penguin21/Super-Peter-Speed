var SpeedCam : float = 5;
var Secounds : float = 125;
var SceneToChange : String;
var duration : float = 1.0;
var colorStart : Color = Color.black;
var colorEnd : Color = Color.clear;

private var FadeInScript : FadeIn;

function Awake()  
{  
    //Get the Script C#  
   	FadeInScript = this.GetComponent("FadeIn");
}

function Update () {
	CameraCredits();
}

function CameraCredits(){
	var lerp: float = Mathf.PingPong(Time.time, duration) / duration;
	
	transform.Translate(Vector3(0,-SpeedCam,0) * Time.deltaTime);
	yield WaitForSeconds(Secounds);
	GetComponent(FadeIn).enabled = true;
	yield WaitForSeconds(1.5);
	Application.LoadLevel(SceneToChange);
}