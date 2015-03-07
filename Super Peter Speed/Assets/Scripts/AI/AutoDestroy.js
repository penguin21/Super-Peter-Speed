var TimeForDestroy = 2.0;

function Update () {
	Destroy();
}

function Destroy(){
	yield WaitForSeconds(TimeForDestroy);
	Destroy(gameObject);
}