var speed = 5.0;

function Start () {

}

function Update () {
	gameObject.GetComponent(Rigidbody2D).velocity = transform.TransformDirection(Vector3(speed, 0, 0));	
}