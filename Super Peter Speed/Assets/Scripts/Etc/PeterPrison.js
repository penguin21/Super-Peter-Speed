var Sprite1 : Sprite;
var Sprite2 : Sprite;
var particle : GameObject;
var SoundOnCol : AudioClip;

private var h = true;
function Start () {

}

function Update () {

}

function OnTriggerEnter2D(other: Collider2D) {
	if(h){
	Debug.Log("Is Enter");
	other.GetComponent.<Collider2D>().enabled = false;
	Instantiate(particle,gameObject.transform.position,gameObject.transform.rotation);
	GetComponent.<AudioSource>().clip = SoundOnCol;
	GetComponent.<AudioSource>().Play();
	h = false;
	yield WaitForSeconds(5);
	gameObject.GetComponent(SpriteRenderer).sprite = Sprite1;
	yield WaitForSeconds(0.5);
	gameObject.GetComponent(SpriteRenderer).sprite = Sprite2;
	Debug.Log("Is Awake");
	}
}