var endPoint : Vector3; var duration : float = 1.0;

private var startPoint : Vector3; 
private var startTime : float;

function Start() { 
startPoint = transform.position; startTime = Time.time; 
}

function Update () { 
transform.position = Vector3.Lerp(startPoint, endPoint, (Time.time - startTime) / duration); 
}