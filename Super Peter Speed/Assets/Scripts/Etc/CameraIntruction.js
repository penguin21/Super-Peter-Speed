var endPoint : Vector3; var duration : float = 1.0;
private var startPoint : Vector3; 
var startTime : float;
var EndP : Transform;
var StartP : Transform;
var speed : float = 5;
var ForClose : float = 35;
var ForOpen : float = 5;
var ObjWait : GameObject;

private var Up = false;
private var Down = false;

function Start() { 

}

function Update () { 
	var step = speed * Time.deltaTime;
	if(Down == true){
		transform.position = Vector2.MoveTowards(transform.position, EndP.position,step);
	}
	
	if(Up== true){
		transform.position = Vector2.MoveTowards(transform.position, StartP.position,step);
	}
	OnStartPos();
}

function OnStartPos(){
	
	
	yield WaitForSeconds(ForClose);
	Down = true;
	yield WaitForSeconds(ForOpen);
	Down = false;
	Up = true;
}