﻿var Crounching : boolean = false;
var Player : GameObject;
var SX : float = 0.1;
var SY : float = 0.25;
var CX : float = 0;
var CY : float = -0.11;
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
		Player.GetComponent(BoxCollider2D).size.y = 0.27;
		Player.GetComponent(BoxCollider2D).size.x = 0.16;
		Player.GetComponent(BoxCollider2D).center.y = 0.01;
		Player.GetComponent(BoxCollider2D).center.x = 0.01;
	}
}