var IsSwimg : boolean = false;
var Speed : float = 5;
var SpeedUp : float = 5;
var anim : Animator;
var Gravity : float = 0.5;
var size : float = 5;
var Player : GameObject;
var Angular : float = 0;

function Start () {

}

function Update () {
	
	if(IsSwimg == true){
		anim.Play("SwimgStand");
		anim.SetFloat("vSpeed", 0.0);
		anim.SetFloat("Speed", 0.0);
		Player.GetComponent.<Rigidbody2D>().gravityScale = Gravity;
		
		if(Input.GetAxis("Move") < 0){
			anim.Play("SwimgMove");
			transform.localScale.x = -size;
			Player.GetComponent.<Rigidbody2D>().velocity = new Vector2 (-Speed,0);
		}
		else
		{
			anim.Play("SwimgStand");
			Player.GetComponent.<Rigidbody2D>().gravityScale = Gravity;
		}
		
		if(Input.GetAxis("Move") > 0){
			anim.Play("SwimgMove");
			transform.localScale.x = size;
			Player.GetComponent.<Rigidbody2D>().velocity = new Vector2 (Speed,0);
		}
		else
		{
			Player.GetComponent.<Rigidbody2D>().gravityScale = Gravity;
		}
		
		if(Input.GetAxis("Up and Crouch") < 0){
			anim.Play("SwimgMove");
			Player.GetComponent.<Rigidbody2D>().velocity = new Vector2 (0,-SpeedUp);
		}
		else
		{
			anim.Play("SwimgStand");
			Player.GetComponent.<Rigidbody2D>().gravityScale = Gravity;
		}
		
		if(Input.GetAxis("Up and Crouch") > 0){
			anim.Play("SwimgMove");
			Player.GetComponent.<Rigidbody2D>().velocity = new Vector2 (0,SpeedUp);
		}
		else
		{
			anim.Play("SwimgStand");
			Player.GetComponent.<Rigidbody2D>().gravityScale = Gravity;
		}
		
		if(Input.GetButton("Attack")){
		
		}
	}
}