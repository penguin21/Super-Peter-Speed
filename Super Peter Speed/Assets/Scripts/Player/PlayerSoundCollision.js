var SoundCollision : AudioClip;

function OnCollision2DStay(other : Collision2D){
	GetComponent.<AudioSource>().PlayOneShot(SoundCollision ,0.7);
}

