@script RequireComponent(AudioSource)
var CheckPointSound : AudioClip;
var CheckPoint : Transform;
var FlagPoint : GameObject;

private var checkpointIs = false;

function Start () {
	FlagPoint.SetActive(false);
}

function Update () {

}

function OnTriggerEnter2D(other : Collider2D){
	if(checkpointIs == false){
	if(other.gameObject.tag == "Player"){
		other.GetComponent(PlayerAI).Respawn = CheckPoint;
		audio.PlayOneShot(CheckPointSound, 0.7);
		FlagPoint.SetActive(true);
		Debug.Log("CheckPoint!!");
		checkpointIs = true;
		}
	}
}