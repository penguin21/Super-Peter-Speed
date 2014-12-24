var ButtleObj : GameObject;
var TimeForDestory : float = 0.1;
var FlyOff : float = 2;

function Start(){
	Destroy();
}

function OnCollisionEnter2D(){
	yield WaitForSeconds (TimeForDestory);
	Destroy(ButtleObj);
}

function Destroy(){
	yield WaitForSeconds(FlyOff);
	Destroy(ButtleObj);
}