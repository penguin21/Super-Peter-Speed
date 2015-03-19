var ColL : GameObject;
var ColR : GameObject;
var IsRod = false;
var L = false;
var R = false;
var speedShell = 10.0;
var Col1 : Transform;
var Col2 : Transform;
var anim : Animator;
var size = 5.0;
var hitBlockSound : AudioClip;
var IsUp = false;
var TimeToUp = 2.0;
var TimeToUpPrep = 5.0;
var flowShell : GameObject;
var flowShellSpawn : Transform;

var H = true;

function Start () {
	
}

function Update () {
	if(IsRod == true){
		if(L == true){
			transform.localScale.x = size;
			gameObject.GetComponent.<Rigidbody2D>().velocity = new Vector2 (speedShell,0);
			anim.SetBool("Stand", false);
			anim.SetBool("Rod", true);
			H = false;
		}
		
		if(R == true){
			transform.localScale.x = -size;
			gameObject.GetComponent.<Rigidbody2D>().velocity = new Vector2 (-speedShell,0);
			anim.SetBool("Stand", false);
			anim.SetBool("Rod", true);
			H = false;
		}
		
		if(L == false && R == false){
			gameObject.GetComponent.<Rigidbody2D>().velocity = new Vector2 (0,0);
			anim.SetBool("Stand", true);
			anim.SetBool("Rod", false);
			H = true;
		}
		
		RayCasting();
		Ber();	
	}
		if(IsRod == false){
			gameObject.GetComponent.<Rigidbody2D>().velocity = new Vector2 (0,0);
			anim.SetBool("Stand", true);
			anim.SetBool("Rod", false);
		}
		if(IsUp == true){
			if(H == true){
			ShellUp();
			}
		}
}

function RayCasting(){
	CollsionIs = Physics2D.Linecast(Col1.position, Col2.position);
	if(Physics2D.Linecast(Col1.position, Col2.position)){
		if(L == true){
			L = false;
			R = true;
			GetComponent.<AudioSource>().PlayOneShot(hitBlockSound, 0.7);
		}
		else
		if(R == true){
			L = true;
			R = false;
			GetComponent.<AudioSource>().PlayOneShot(hitBlockSound, 0.7);
			}
	}
}

function Ber (){
	
}

function OnCollisionEnter2D(other : Collision2D){
	if(other.gameObject.tag == "Enemy"){
		if(IsRod == true){
			if(other.gameObject.GetComponent(GunIsDeathEnemy)){
				other.gameObject.GetComponent(GunIsDeathEnemy).Death();
			}
		}
	}
}

function ShellUp(){
	if(IsUp == true){
	if(H == true){
		yield WaitForSeconds(TimeToUpPrep);
		GetComponent(Animator).SetBool("ShellUp", true);
		yield WaitForSeconds(TimeToUp);
		Instantiate(flowShell, flowShellSpawn.transform.position, flowShellSpawn.transform.rotation);
		H = false;
		Destroy(gameObject);
		}
	}
}