var CheckPointSound : AudioClip;
var CheckPoint : Transform;

function Start () {

}

function Update () {

}

function OnTriggerEnter2D(other : Collider2D){
	if(other.gameObject.tag == "Player"){
		other.GetComponent(PlayerAI).Respawn = CheckPoint;
		Debug.Log("CheckPoint!!");
	}
}