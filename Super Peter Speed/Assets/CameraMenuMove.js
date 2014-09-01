var speed = 1.5;
 
function Update () {
    transform.Translate(Vector3(Input.GetAxis("Move") * speed * Time.deltaTime, 0.0));
}