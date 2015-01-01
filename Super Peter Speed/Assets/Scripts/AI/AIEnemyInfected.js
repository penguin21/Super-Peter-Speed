var InfectedParticles : GameObject;
var colorInfected : Color = Color.green;
var colorDesinfected : Color = Color.white;
var durationForDesinfect : float = 1.0;
var durationForDesinfectTotal : float = 1.05;

private var b = false;

function Start () {
	renderer.material.color = colorInfected;
}

function Update () {
	
	if(gameObject.transform.tag == "Enemy"){
		Colorul();
	}
}

function Colorul(){
	var lerp : float = Mathf.PingPong (Time.time, durationForDesinfect) / durationForDesinfect;
	if(b == false){
	renderer.material.color = Color.Lerp (colorInfected, colorDesinfected, lerp);
	yield WaitForSeconds(durationForDesinfectTotal);
	b = true;
	}
	if(b == true){
	renderer.material.color = colorDesinfected;
	}
}