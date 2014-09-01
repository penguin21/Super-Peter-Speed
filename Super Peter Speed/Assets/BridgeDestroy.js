var anim : Animator;
var SecoundsForDestruction : float = 0.5;

function OnCollisionEnter2D(other : Collision2D){
	if(other.gameObject.tag == "Player"){
		anim.SetBool("Normal", false);
		anim.SetBool("Destroy", true);
		yield WaitForSeconds(SecoundsForDestruction);
		Destroy(gameObject);
	}
}