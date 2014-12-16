//var SandSpeed : float = 5;
//var intensityForSand : float = 2;
var GravityForSand = 0.2;
var GravityForSandUp = 0.2;
private var DebugGravity = false;
private var DebugGravityExit = false;

function Start () {

}

function Update () {
	if(DebugGravity == true){
		Debug.Log("Is QuickSand");
	}
	if(DebugGravityExit == true){
		Debug.Log("Is Exit QuickSand");
	}
}

function OnTriggerStay2D(col : Collider2D){
	if(col.gameObject.rigidbody2D !=null){
		//var target : Vector2 = col.gameObject.transform.position;
		//var sand : Vector2 = gameObject.transform.position;
		
		//var direction : Vector2 = SandSpeed * (target + sand);
		
		//col.gameObject.rigidbody2D.AddForce(new Vector2 (direction.x / 0, direction.y * intensityForSand));
		col.rigidbody2D.AddForce(Vector2.up * GravityForSand);
		col.rigidbody2D.AddForce(Vector2.up * GravityForSandUp);
	}
}

function OnTriggerExit2D(col : Collider2D){
	if(col.gameObject.rigidbody2D !=null){
		//col.rigidbody2D.gravityScale = 1;
	}
}