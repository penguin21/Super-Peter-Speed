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
		Player.rigidbody2D.gravityScale = Gravity;
		
		if(Input.GetAxisRaw("Move") < 0){
			anim.Play("SwimgMove");
			transform.localScale.x = -size;
			transform.Translate(Vector3(-Speed,0,0) * Time.deltaTime);
		}
		else
		{
			anim.Play("SwimgStand");
			transform.Translate(Vector3(0,0,0) * Time.deltaTime);
			Player.rigidbody2D.gravityScale = Gravity;
		}
		
		if(Input.GetAxisRaw("Move") > 0){
			anim.Play("SwimgMove");
			transform.localScale.x = size;
			transform.Translate(Vector3(Speed,0,0) * Time.deltaTime);
		}
		else
		{
			transform.Translate(Vector3(0,0,0) * Time.deltaTime);
			Player.rigidbody2D.gravityScale = Gravity;
		}
		
		if(Input.GetAxisRaw("Up and Crouch") < 0){
			anim.Play("SwimgMove");
			transform.Translate(Vector3(0,-SpeedUp,0) * Time.deltaTime);
		}
		else
		{
			anim.Play("SwimgStand");
			transform.Translate(Vector3(0,0,0) * Time.deltaTime);
			Player.rigidbody2D.gravityScale = Gravity;
		}
		
		if(Input.GetAxisRaw("Up and Crouch") > 0){
			anim.Play("SwimgMove");
			transform.Translate(Vector3(0,SpeedUp,0) * Time.deltaTime);
		}
		else
		{
			anim.Play("SwimgStand");
			transform.Translate(Vector3(0,0,0) * Time.deltaTime);
			Player.rigidbody2D.gravityScale = Gravity;
		}
		
		if(Input.GetButton("Attack")){
		
		}
	}
}