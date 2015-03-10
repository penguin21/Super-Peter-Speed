var anim: Animator;
var waitForStopAnimation : float = 0.124;
@script RequireComponent(AudioSource);
var SoundSpring : AudioClip;

function OnCollisionEnter2D (other : Collision2D){
	GetComponent.<AudioSource>().PlayOneShot(SoundSpring, 0.7);
	anim.SetBool("Normal",false);
	anim.SetBool("IsJump",true);
}

function OnCollisionExit2D (other : Collision2D){
	yield WaitForSeconds (waitForStopAnimation);
	anim.SetBool("IsJump",false);
	anim.SetBool("Normal",true);
}