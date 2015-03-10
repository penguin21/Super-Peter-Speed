var bounce : boolean = false;
var bounceAmount : float = 10;
var Player : Transform;
 
function OnCollisionEnter2D (other : Collision2D) {
    if(other.gameObject.tag == "Player") {
        bounce = true;
    }
}
 
function Update () {
    if(bounce) {
Player.rigidbody2d.velocity.y = bounceAmount;    Player.GetComponent.<Rigidbody2D>().AddForce(Vector2.up);
bounce = false;
    }
}