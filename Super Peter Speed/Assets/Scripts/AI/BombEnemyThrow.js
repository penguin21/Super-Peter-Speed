var ExplosionObject : GameObject;
var ExplosionWaitingColor  : Color = Color.white;
var ExplosionWaitingColor2  : Color = Color.red;
var waitingForExplosionTime : float = 5.0;
var DurationColor : float = 1.0;
var TNT : GameObject;
var SpawnExplosion : GameObject;

function Start(){
	StartExplosion();
}

function StartExplosion (){
	var lerp : float = Mathf.PingPong (Time.time, DurationColor) / DurationColor;
			TNT.GetComponent.<Renderer>().material.color = Color.Lerp (ExplosionWaitingColor, ExplosionWaitingColor2 , lerp);
			yield WaitForSeconds (waitingForExplosionTime);
			Instantiate(ExplosionObject, SpawnExplosion.transform.position, SpawnExplosion.transform.rotation);
			Destroy(TNT);
			yield WaitForSeconds (0.5);
			Destroy(gameObject);
}
