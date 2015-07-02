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
var ButtleSize : float = 1.818816;
var ButtleIsSize : boolean = true;
var RootSpeed : float = 1.5;
var IsPause : boolean = false;
var R = false;
var L = false;

private var Pause : GameObject;
 
function Start () {
    R = true;
    facingR  = true;
    CanFire = true;
 	facingUp = false;
 	Pause = GameObject.FindWithTag ("Pause");
}
 
function Update () {
    
    var flat : Quaternion;
    if(IsPause == false){
    if(Input.GetAxis("Move") < 0) {
        newRot = ArmObj.transform.rotation = Quaternion.Euler(Vector3(0,0,LeftRotation));
        ArmObj.transform.rotation = Quaternion.Slerp(ArmObj.transform.rotation, newRot, Time.time * RootSpeed);
        facingR = false;
        facingL = true;
        facingU = false;
        facingD = false;
        L = true;
        R = false;
    }   
    
    
    if(Input.GetAxis("Move") > 0) {
       newRot2 = ArmObj.transform.rotation = Quaternion.Euler(Vector3(0,0,RigthRotation));
       ArmObj.transform.rotation = Quaternion.Slerp(ArmObj.transform.rotation, newRot2, Time.time * RootSpeed);
         facingL = false;
        facingR = true;
        facingU = false;
        facingD = false;
        L = false;
        R = true;
}
    
    
        if(Input.GetAxis("Up and Crouch") > 0) {
        newRot3 =ArmObj.transform.rotation = Quaternion.Euler(Vector3(0,0,UpRotation));
        ArmObj.transform.rotation = Quaternion.Slerp(ArmObj.transform.rotation, newRot3, Time.time * RootSpeed);
        facingU = true;
        facingD = false;
        facingR = false;
        facingL = false;
       }
       else
       {
       	 ArmObj.transform.rotation = Quaternion.Euler(Vector3(0,0,LeftRotation));
        ArmObj.transform.rotation = Quaternion.Slerp(ArmObj.transform.rotation, flat, Time.time * RootSpeed);
        facingU = false;
        if(R){
        	facingR = true;
        }
        if(L){
        	facingL = true;
        }
       }
    	
    	if(FacingDIs == true){
    	if(Input.GetAxis("Up and Crouch") < 0) {
        newRot4 =ArmObj.transform.rotation = Quaternion.Euler(Vector3(0,0,UpRotation));
        ArmObj.transform.rotation = Quaternion.Slerp(ArmObj.transform.rotation, newRot4, Time.time * RootSpeed);
        facingU = false;
        facingD = true;
        facingR = false;
        facingL = false;
       }
       else
       {
       	ClassicRot = ArmObj.transform.rotation = Quaternion.Euler(Vector3(0,0,LeftRotation));
        ArmObj.transform.rotation = Quaternion.Slerp(ArmObj.transform.rotation, ClassicRot, Time.time * 0.5);
        facingU = false;
       }
}
    if(Input.GetButtonDown("Attack")){
        Fire();
    	}
    }
    if(Pause.GetComponent(SimplePause)){
    	if(Pause.GetComponent(SimplePause).pauseGame == true){
    		IsPause = true;
    	}
    	else
    	{
   		IsPause = false;
    	}
    }
    
    if(!Pause.GetComponent(SimplePause)){
    	if(Pause.GetComponent(SimplePauseMP).pauseGame == true){
  		IsPause = true;
    	}
    	else
    	{
   		IsPause = false;
    	}
    }
}   
function Fire() {
    if(IsPause == false){
    if(facingR == true && CanFire == true) { //Shot Rigth
var myPos = Camera.main.WorldToScreenPoint(transform.position);
var dir = myPos - Input.mousePosition;
clone = Instantiate(bullet, Spawn.transform.position, Spawn.transform.rotation);
clone.AddForce(Vector2.right * speed);
        GetComponent.<AudioSource>().Play();
        CanFire = false;
        yield WaitForSeconds (FireRate);
        CanFire = true;
        yield WaitForSeconds (ButtleDesipearIn);
        Destroy (GameObject.FindWithTag("Buttle"));

    }
 
    if(facingL == true && CanFire == true) { //Shot Left
clone = Instantiate(bullet, Spawn.transform.position, Spawn.transform.rotation);
clone.AddForce(Vector2.right * -speed);
        if(ButtleIsSize == true){
        clone.transform.localScale.x = -ButtleSize;
        }
        GetComponent.<AudioSource>().Play();
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
        GetComponent.<AudioSource>().Play();
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
        GetComponent.<AudioSource>().Play();
        Destroy(clone, 1.0);
        CanFire = false;
        yield WaitForSeconds (FireRate);
        CanFire = true;
        yield WaitForSeconds (ButtleDesipearIn);
        Destroy (GameObject.FindWithTag("Buttle"));
    	}
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