var SoundCollision : AudioClip;

function OnCollision2DStay(other : Collision2D){
	audio.PlayOneShot(SoundCollision ,0.7);
}

