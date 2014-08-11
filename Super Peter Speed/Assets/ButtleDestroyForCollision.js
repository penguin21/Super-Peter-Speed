var ButtleObj : GameObject;
var TimeForDestory : float = 0.1;

function OnCollisionEnter2D(){
	yield WaitForSeconds (TimeForDestory);
	Destroy(ButtleObj);
}