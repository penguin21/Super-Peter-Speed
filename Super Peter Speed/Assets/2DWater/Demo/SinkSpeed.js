#pragma strict
//var UpThrustForce: float;
var WaterLevel: float;
var SinkSpeed: float; //Negative value
function FixedUpdate () {
	if(transform.position.y < WaterLevel){
		//transform.rigidbody.velocity.y += UpThrustForce;
		if(transform.rigidbody.velocity.y < SinkSpeed){
			transform.rigidbody.velocity.y = SinkSpeed;
		}
	}
}