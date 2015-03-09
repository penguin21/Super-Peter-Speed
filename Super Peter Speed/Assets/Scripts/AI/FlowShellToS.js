var EnemyObj : GameObject;
var EnemyStompSound : AudioClip;
var EnemyStompObj : GameObject;
var ShellInstantSpawn : Transform;
var Shell : GameObject;

function OnCollisionEnter2D (other : Collision2D){
	if(other.gameObject.tag == "Player"){
		Instantiate(Shell, ShellInstantSpawn.transform.position, ShellInstantSpawn.transform.rotation);
		Destroy(EnemyObj);
	}
}