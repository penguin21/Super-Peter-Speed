var SoundHit : AudioClip;
var Sec = 5.0;
var SmokePar : GameObject;
var PointSmoke : Transform;
private var h = false;

function Start () {
	GameOver();
}

function Update () {

}

function GameOver(){
	yield WaitForSeconds(Sec);
	GetComponent(AudioSource).PlayOneShot(SoundHit);
	if(h == false){
		Instantiate (SmokePar, PointSmoke.transform.position, PointSmoke.transform.rotation);
		h = true;
	}
}