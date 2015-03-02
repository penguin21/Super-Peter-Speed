var pos : Vector3;
var mainCamera : Camera;

function Start () {

}

function Update () {
	pos = Input.mousePosition;
    pos.z = gameObject.transform.position.z- mainCamera.transform.position.z;
    transform.position = mainCamera.ScreenToWorldPoint(pos);
}