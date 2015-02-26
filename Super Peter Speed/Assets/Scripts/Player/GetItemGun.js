var GunItem : GameObject;
var ArmIsNotActive : boolean = false;
var Arm : GameObject;
var NameSaveGun : String;
var SoundGet : AudioClip;
var Player : GameObject;
var DoorH : GameObject;

function Start () {
	yield WaitForSeconds(0.1);
	Player = GameObject.FindWithTag("Player");
}

function Update () {

}

function OnCollisionEnter2D(other: Collision2D) {
	if(other.gameObject.tag == "Player"){
		if(ArmIsNotActive == true){
			audio.PlayOneShot(SoundGet, 0.7);
			Player.GetComponent(PlayerAI).OnlyPrin();
			Arm.SetActive(true);
			DoorH.SetActive(true);
			yield WaitForSeconds(0.5);
			Destroy(gameObject);
		}
		if(ArmIsNotActive == false){
			audio.PlayOneShot(SoundGet, 0.7);
			GunItem.SetActive(true);
			yield WaitForSeconds(0.5);
			Destroy(gameObject);
		}
	}
}		