var target : Transform; 
var moveSpeed = 3; 
var rotationSpeed = 3; 
var attackThreshold = 3; 
var chaseThreshold = 10; 
var maxDistance = 3; 
var giveUpThreshold = 20; 
var attackRepeatTime = 1;

private var chasing = false; 
private var attackTime = Time.time;

var myTransform : Transform;

function Awake() { 
myTransform = transform; 
}

function Start() { 
target = GameObject.FindWithTag("Player").transform; //target the player }
}
function Update () {

// check distance to target every frame:
var distance = (target.position - myTransform.position).magnitude;
 
if (chasing) {
 
    //rotate to look at the player
    myTransform.rotation = Quaternion.Slerp(myTransform.rotation,
    Quaternion.LookRotation(target.position - myTransform.position), rotationSpeed*Time.deltaTime);
 
    //move towards the player
    myTransform.position += myTransform.forward * moveSpeed * Time.deltaTime;
 
    // give up, if too far away from target:
    if (distance > giveUpThreshold) {
        chasing = false;
    }
 
    // attack, if close enough, and if time is OK:
    if (distance < attackThreshold && Time.time > attackTime) {
        // Attack! (call whatever attack function you like here)
        attackTime = Time.time + attackRepeatTime;
    }
 
} else {
    // not currently chasing.
 
    // start chasing if target comes close enough
    if (distance < chaseThreshold) {
        chasing = true;
    }
}
}