 var speed : float = 1.0;
 var speedFast = 2.0;
 
 private var speedActual : float;
 
 function Update() {
     var move = Vector3(Input.GetAxis("Move"), Input.GetAxis("Up and Crouch"), 0);
     transform.position += move * speedActual * Time.deltaTime;
     
     if(Input.GetKey(KeyCode.LeftShift)){
     	speedActual = speedFast;
     }else{
     	speedActual = speed;
     }
 }