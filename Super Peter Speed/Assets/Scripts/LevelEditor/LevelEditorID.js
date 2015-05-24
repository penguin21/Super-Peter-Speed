var ID = 0;
var IsNPC = false;
var NPCObj : GameObject; //Only "IsNPC = true"
var IsPlay = false;

private var h = true;

function Start () {

}

function Update () {
	if(IsNPC){
		if(IsPlay){
			if(h){
				h = false;
				Instantiate (NPCObj, gameObject.transform.position, gameObject.transform.rotation);
				Destroy(gameObject);
			}
		}
	}
}