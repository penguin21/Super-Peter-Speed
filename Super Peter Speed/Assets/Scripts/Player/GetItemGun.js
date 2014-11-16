var GunItem : GameObject;
var ArmIsNotActive : boolean = false;
var Arm : GameObject;
var NameSaveGun : String;
var SoundGet : AudioClip;

function Start () {

}

function Update () {

}

function OnCollisionEnter2D(other: Collision2D) {
	if(other.gameObject.tag == "Player"){
		if(ArmIsNotActive == true){
			audio.PlayOneShot(SoundGet, 0.7);
			Arm.SetActive(true);
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