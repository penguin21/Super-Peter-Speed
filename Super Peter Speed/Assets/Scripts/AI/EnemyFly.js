var enemyDrop : GameObject;//Hit the enemy drop original enemy
var speed = 5.0;//Ajust the speed
var size = 12.21373;//Size original enemy
var UpToDown = false;//Can enemy fly to up or down
var LeftToRigth = true;//Can enemy fly to left or rigth
var searhRange : float = 15;
var way : boolean;
var UpRay : Transform;
var DownRay : Transform;
var LeftRay : Transform;
var RigthRay : Transform;
var isTimer = false;
var howLong : int = 150;
var timer : int;

private var h = false;
private var PlayerTarget : Transform;
private var IsActive = false;
private var distanceToTarget : float = 0.0;

function Start () {
	yield WaitForSeconds(0.01);
	PlayerTarget = GameObject.FindWithTag ("Player").transform;
	h = true;
}

function Update () {
	if(h){
		distanceToTarget = Vector3.Distance(PlayerTarget.transform.position, transform.position);
		if(distanceToTarget <= searhRange){
			IsActive = true;
		}
		
		if(IsActive){
			if(isTimer){
			timer += 1;
			if ( timer >= howLong ) {
			timer = 0;
				}		
			
			if(way){
				way = false;
				return;
			}
			
			if(!way){
				way = true;
				return;
				}
			}
		if(LeftToRigth){
				if(way){//Rigth
					transform.localScale.x = -size;
					GetComponent.<Rigidbody2D>().velocity = new Vector2 (-speed,GetComponent.<Rigidbody2D>().velocity.y);
				}
				if(!way){//Left
					transform.localScale.x = size;
					GetComponent.<Rigidbody2D>().velocity = new Vector2 (speed,GetComponent.<Rigidbody2D>().velocity.y);
				}
			}
		if(UpToDown){
				if(way){//Up
					GetComponent.<Rigidbody2D>().velocity = new Vector2 (0,speed);
				}
				if(!way){//Down
					GetComponent.<Rigidbody2D>().velocity = new Vector2 (0,-speed);
				}
			}
		}
		RayCasting();
		Ber();
	}
}


function RayCasting(){
	
	if(LeftToRigth){
		CollsionIs = Physics2D.Linecast(LeftRay.position, RigthRay.position);
		
		if(Physics2D.Linecast(LeftRay.position, RigthRay.position)){
			way = !way;
			timer = 0;
			Debug.Log("Touching");
			return;
		}
	}
	
	if(UpToDown){
		CollsionIs = Physics2D.Linecast(UpRay.position, DownRay.position);
		
		if(Physics2D.Linecast(UpRay.position, DownRay.position)){
			way = !way;
			timer = 0;
			return;
		}
	}
}

function Ber (){
	
}
