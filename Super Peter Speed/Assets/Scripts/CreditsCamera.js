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
	if (Input.anyKeyDown){//To skip Credits
    keyPressed = Input.inputString;
    SkipCredits();
	}
	CameraCredits();
}

function CameraCredits(){//Camera Down
	var lerp: float = Mathf.PingPong(Time.time, duration) / duration;
	
	transform.Translate(Vector3(0,-SpeedCam,0) * Time.deltaTime);
	yield WaitForSeconds(Secounds);
	SpeedCam = 0;
	yield WaitForSeconds(5);
	GetComponent(FadeIn).enabled = true;
	yield WaitForSeconds(1.5);
	Application.LoadLevel(SceneToChange); //Change to Scene
}

function SkipCredits(){
	GetComponent(FadeIn).enabled = true;
	yield WaitForSeconds(1.5);
	Application.LoadLevel(SceneToChange);
}