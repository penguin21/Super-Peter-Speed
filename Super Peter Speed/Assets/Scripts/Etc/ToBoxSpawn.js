var Spawn : Transform;
var Obj : GameObject;

function OnTriggerEnter2D (other : Collider2D){
	if(other.gameObject.name == "Colli"){
		objS = Instantiate(Obj, Spawn.transform.position, Spawn.transform.rotation);
		objS.transform.position.z = 0;
	}
}