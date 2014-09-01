var Spawn : GameObject;
var speed : float;
var bullet : Rigidbody2D;
var facingR : boolean;
var facingL : boolean;
var facingU : boolean;
var facingD : boolean;
var CanFire : boolean;
var FireRate : float;
var ButtleDesipearIn : float;
var ArmObj : GameObject;
var LeftRotation : float;
var RigthRotation : float;
var UpRotation : float;
var DownRotation : float;
private var z : float;
var Player : GameObject;
var FacingDIs : boolean;
var PlayerName : String = "Peter";
 
 
function Start () {
    facingR  = true;
    CanFire = true;
 	facingUp = false;
 
 
}
 
function Update () {
    
    var flat : Quaternion;
    
    if(Input.GetAxis("Move") < 0) {
        ArmObj.transform.rotation = Quaternion.Euler(Vector3(0,0,LeftRotation));
        ArmObj.transform.rotation = Quaternion.Slerp(transform.rotation, flat, Time.deltaTime * 0.5);
        facingR = false;
        facingL = true;
        facingU = false;
        facingD = false;
    }   
    
    
    if(Input.GetAxis("Move") > 0) {
       ArmObj.transform.rotation = Quaternion.Euler(Vector3(0,0,RigthRotation));
       ArmObj.transform.rotation = Quaternion.Slerp(transform.rotation, flat, Time.deltaTime * 0.5);
         facingL = false;
        facingR = true;
        facingU = false;
        facingD = false;
}
    
    
        if(Input.GetAxis("Up and Crouch") > 0) {
        ArmObj.transform.rotation = Quaternion.Euler(Vector3(0,0,UpRotation));
        ArmObj.transform.rotation = Quaternion.Slerp(transform.rotation, flat, Time.deltaTime * 0.5);
        facingU = true;
        facingD = false;
        facingR = false;
        facingL = false;
       }
       else
       {
       	 ArmObj.transform.rotation = Quaternion.Euler(Vector3(0,0,LeftRotation));
        ArmObj.transform.rotation = Quaternion.Slerp(transform.rotation, flat, Time.deltaTime * 0.5);
        facingU = false;
       }
    	
    	if(FacingDIs == true){
    	if(Input.GetAxis("Up and Crouch") < 0) {
        ArmObj.transform.rotation = Quaternion.Euler(Vector3(0,0,UpRotation));
        ArmObj.transform.rotation = Quaternion.Slerp(transform.rotation, flat, Time.deltaTime * 0.5);
        facingU = false;
        facingD = true;
        facingR = false;
        facingL = false;
       }
       else
       {
       	 ArmObj.transform.rotation = Quaternion.Euler(Vector3(0,0,LeftRotation));
        ArmObj.transform.rotation = Quaternion.Slerp(transform.rotation, flat, Time.deltaTime * 0.5);
        facingU = false;
       }
}
    if(Input.GetButtonDown("Attack")){
        Fire();
    }   
}   
function Fire() {
    if(facingR == true && CanFire == true) { //Shot Rigth
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
 
    if(facingL == true && CanFire == true) { //Shot Left
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
  
      if(facingU == true && CanFire == true) { //Shot Up
clone = Instantiate(bullet, Spawn.transform.position, Spawn.transform.rotation);
clone.AddForce(Vector2.up * speed);
        audio.Play();
        Destroy(clone, 1.0);
        CanFire = false;
        yield WaitForSeconds (FireRate);
        CanFire = true;
        yield WaitForSeconds (ButtleDesipearIn);
        Destroy (GameObject.FindWithTag("Buttle"));
    }
          if(facingD == true && CanFire == true) { //Shot Down
clone = Instantiate(bullet, Spawn.transform.position, Spawn.transform.rotation);
clone.AddForce(Vector2.up * -speed);
        audio.Play();
        Destroy(clone, 1.0);
        CanFire = false;
        yield WaitForSeconds (FireRate);
        CanFire = true;
        yield WaitForSeconds (ButtleDesipearIn);
        Destroy (GameObject.FindWithTag("Buttle"));
    }
}
 
function OnCollisionExit2D (Player : Collision2D){
	if(Player.Player){
		FacingDIs = true;
	}
}
function OnCollisionStay2D(Player: Collision2D){
	if(Player.Player){
		FacingDIs = false;
	}
}