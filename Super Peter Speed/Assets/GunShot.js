var IsShot : boolean = true;
var Buttle : GameObject;
var speed	: int = 5;

function Start () {

}

function Update () {
	if(Buttle == true){
			transform.Translate(Vector3(10, 0, 0) * Time.deltaTime);
			}
	if(Buttle == false){
			transform.Translate(Vector3(-10, 0, 0) * Time.deltaTime);
			}
}