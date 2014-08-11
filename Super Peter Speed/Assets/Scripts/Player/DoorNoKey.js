var Level : String;

function OnTriggerEnter2D(other : Collider2D){
	if(other.gameObject.tag == "Player"){
		if(Input.GetAxis("Up and Crouch") > 0){
				Application.LoadLevel(Application.loadedLevel);
		}
	}
}