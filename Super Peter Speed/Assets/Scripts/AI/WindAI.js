﻿#pragma strict
var WindSpeed : float = 20;

function Start () {

}

function Update () {

}

function OnTriggerStay2D(col : Collider2D){
	if(col.gameObject.rigidbody2D !=null){
		var target : Vector2 = col.gameObject.transform.position;
		var wind : Vector2 = gameObject.transform.position;
		
		var direction : Vector2 = WindSpeed * (target - wind);
		
		col.gameObject.rigidbody2D.AddForce(new Vector2 (direction.x / 1, direction.y * 0));
	}
}