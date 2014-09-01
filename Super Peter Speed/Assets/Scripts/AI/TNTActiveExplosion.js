var ExplosionObject : GameObject;
@script RequireComponent(AudioSource)
var ExplosionSound : AudioClip;
var ExplosionWaitingColor  : Color = Color.white;
var ExplosionWaitingColor2  : Color = Color.red;
var waitingForExplosionTime : float = 5.0;
var DurationColor : float = 1.0;
var TNT : GameObject;
var SpawnExplosion : GameObject;
var force : float;

function OnTriggerStay2D (other : Collider2D){
	var lerp : float = Mathf.PingPong (Time.time, DurationColor) / DurationColor;
	
	if(other.gameObject.tag == "Player"){
		if(Input.GetButtonDown("Interact")){
			var r3 : Vector3 = Camera.main.WorldToScreenPoint(transform.position);
			
		
			TNT.renderer.material.color = Color.Lerp (ExplosionWaitingColor, ExplosionWaitingColor2 , lerp);
			yield WaitForSeconds (waitingForExplosionTime);
			audio.PlayOneShot(ExplosionSound , 0.7);
			Instantiate(ExplosionObject, SpawnExplosion.transform.position, SpawnExplosion.transform.rotation);
			Destroy(TNT);
			yield WaitForSeconds (0.5);
			Destroy(gameObject);
		}
	}
}