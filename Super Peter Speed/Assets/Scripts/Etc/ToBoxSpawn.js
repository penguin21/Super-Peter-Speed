var Spawn : Transform;
var Obj : GameObject;

function OnTriggerEnter2D (other : Collider2D){
	if(other.gameObject.name == "Colli"){
		Instantiate(Obj, Spawn.transform.position, Spawn.transform.rotation);
	}
}