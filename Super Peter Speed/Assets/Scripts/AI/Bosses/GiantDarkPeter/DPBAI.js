var BossActive = true;
var speed = 10.0;
var speedX = 0;

function Start () {

}

function Update () {
	if(BossActive == true){
		transform.Translate(Vector3(-speed,0,speedX) * Time.deltaTime);
	}
}