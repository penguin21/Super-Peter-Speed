var ObjOnBrick : GameObject;
var BrickObj : GameObject;
var BrickBreakSoundEffect : GameObject;
var BrickParticles : GameObject;

function OnCollisionEnter2D(other : Collision2D){
	if(other.gameObject.tag == "Buttle"){
		Instantiate(ObjOnBrick, transform.position + Vector3(0, 0, 0), Quaternion.Euler(0,0,0) );
		Instantiate(BrickBreakSoundEffect, transform.position + Vector3(0, 0, 0), Quaternion.Euler(0,0,0) );		
		Instantiate(BrickParticles, transform.position + Vector3(0, 0, 0), Quaternion.Euler(0,0,0) );
		Destroy(BrickObj);
	}
}