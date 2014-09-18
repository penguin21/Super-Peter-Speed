// array to hold waypoint locations
var waypoints : Transform[];
 
// variable to control time taken to travel between points
var duration : float = 1.0;
 
private var startPoint : Vector3;
private var endPoint : Vector3;
private var startTime : float;
 
// the array index number of the current target waypoint
private var targetwaypoint : int;
 
function Start() {
 
    startPoint = transform.position;
    startTime = Time.time;
 
    if(waypoints.Length <= 0){
        Debug.Log("No waypoints found");
        enabled = false;
    }
 
    targetwaypoint = 0;
    endPoint = waypoints[targetwaypoint].position;
}
 
function Update () {
 
    var i = (Time.time - startTime) / duration;
    transform.position = Vector3.Lerp(startPoint, endPoint, i);
 
    if(i >= 1){
 
        startTime = Time.time;
 
        // increment and wrap the target waypoint index
        targetwaypoint++;
        targetwaypoint = targetwaypoint % waypoints.Length;
 
        // assign the new lerp waypoints
        startPoint = endPoint;
        endPoint = waypoints[targetwaypoint].position;
 
    }
}