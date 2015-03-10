var Sprite1 : Sprite;
var Sprite2 : Sprite;

function Start () {

}

function Update () {

}

function OnTriggerEnter2D(other: Collider2D) {
	Debug.Log("Is Enter");
	other.GetComponent.<Collider2D>().enabled = false;
	yield WaitForSeconds(5);
	gameObject.GetComponent(SpriteRenderer).sprite = Sprite1;
}