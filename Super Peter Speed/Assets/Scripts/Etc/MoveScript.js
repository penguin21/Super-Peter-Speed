var Speed = 10.0;

function Update () {
	transform.Translate(Vector2(Speed,0) * Time.deltaTime);
}