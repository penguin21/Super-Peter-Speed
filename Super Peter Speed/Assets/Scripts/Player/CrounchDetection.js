var Crounching : boolean = false;
var Player : GameObject;
var SX : float = 0.1;
var SY : float = 0.25;
var CX : float = 0;
var CY : float = -0.11;
var POX : float = 0.16;
var POY : float = 0.27;
var POSX : float = 0.01;
var POSY : float =  0.01;
var PlayerAnim : Animator;

function Update () {
	
	

	
	if(PlayerAnim.GetBool("Crouch")){
		Player.GetComponent(BoxCollider2D).size.y = SX;
		Player.GetComponent(BoxCollider2D).size.x = SY;
		Player.GetComponent(BoxCollider2D).center.x = CX;
		Player.GetComponent(BoxCollider2D).center.y = CY;
	}
	else
	{
		Player.GetComponent(BoxCollider2D).size.y = POY;
		Player.GetComponent(BoxCollider2D).size.x = POX;
		Player.GetComponent(BoxCollider2D).center.y = POSY;
		Player.GetComponent(BoxCollider2D).center.x = POSX;
	}
}