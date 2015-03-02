 var speed : float = 1.0;
 
 function Update() {
     var move = Vector3(Input.GetAxis("Move"), Input.GetAxis("Up and Crouch"), 0);
     transform.position += move * speed * Time.deltaTime;
 }