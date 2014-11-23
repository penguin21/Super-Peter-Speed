var endPoint : Vector3; var duration : float = 1.0;
private var startPoint : Vector3; 
var startTime : float;
var EndP : Transform;
var StartP : Transform;
var speed : float = 5;

function Start() { 

}

function Update () { 
var step = speed * Time.deltaTime;
transform.position = Vector3.MoveTowards(transform.position, EndP.position,step);
}