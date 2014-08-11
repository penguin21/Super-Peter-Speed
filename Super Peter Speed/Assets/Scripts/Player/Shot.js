var Spawn : GameObject;
var speed : float;
var bullet : Rigidbody2D;
var facingR : boolean;
var CanFire : boolean;
var FireRate : float;
var ButtleDesipearIn : float;
 
 
function Start () {
    facingR  = true;
    CanFire = true;
 
 
 
}
 
function Update () {
    if(Input.GetAxis("Move") < 0) {
        facingR = false;
    }   
    if(Input.GetAxis("Move") > 0) {
        facingR = true;
    }   
    if(Input.GetButtonDown("Attack")){
        Fire();
    }   
}   
function Fire() {
    if(facingR == true && CanFire == true) {
var myPos = Camera.main.WorldToScreenPoint(transform.position);
var dir = myPos - Input.mousePosition;
clone = Instantiate(bullet, Spawn.transform.position, Spawn.transform.rotation);
clone.AddForce(Vector2.right * speed);
        audio.Play();
        CanFire = false;
        yield WaitForSeconds (FireRate);
        CanFire = true;
        yield WaitForSeconds (ButtleDesipearIn);
        Destroy (GameObject.FindWithTag("Buttle"));

    }
 
    if(facingR == false && CanFire == true) {
clone = Instantiate(bullet, Spawn.transform.position, Spawn.transform.rotation);
clone.AddForce(Vector2.right * -speed);
        audio.Play();
        Destroy(clone, 1.0);
        CanFire = false;
        yield WaitForSeconds (FireRate);
        CanFire = true;
        yield WaitForSeconds (ButtleDesipearIn);
        Destroy (GameObject.FindWithTag("Buttle"));
    }
}
 