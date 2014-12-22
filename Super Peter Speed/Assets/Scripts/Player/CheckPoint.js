@script RequireComponent(AudioSource)
var CheckPointSound : AudioClip;
var CheckPoint : Transform;

private var checkpointIs = false;

function Start () {

}

function Update () {

}

function OnTriggerEnter2D(other : Collider2D){
	if(checkpointIs == false){
	if(other.gameObject.tag == "Player"){
		other.GetComponent(PlayerAI).Respawn = CheckPoint;
		audio.PlayOneShot(CheckPointSound, 0.7);
		Debug.Log("CheckPoint!!");
		checkpointIs = true;
		}
	}
}