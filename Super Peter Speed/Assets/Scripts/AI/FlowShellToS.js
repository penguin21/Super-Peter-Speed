var EnemyObj : GameObject;
var EnemyStompSound : AudioClip;
var EnemyStompObj : GameObject;
var ShellInstantSpawn : Transform;
var Shell : GameObject;
var AudioStomp : GameObject;

function OnCollisionEnter2D (other : Collision2D){
	if(other.gameObject.tag == "Player"){
		EnemyObj.tag = "Untagged";
		Instantiate(Shell, ShellInstantSpawn.transform.position, ShellInstantSpawn.transform.rotation);
		Instantiate(AudioStomp, ShellInstantSpawn.transform.position, ShellInstantSpawn.transform.rotation);
		Destroy(EnemyObj);
	}
}