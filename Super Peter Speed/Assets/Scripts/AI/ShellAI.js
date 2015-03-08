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


function Start () {

}

function Update () {
	if(IsRod == true){
		if(L == true){
			transform.localScale.x = size;
			gameObject.rigidbody2D.velocity = new Vector2 (speedShell,0);
			anim.SetBool("Stand", false);
			anim.SetBool("Rod", true);
		}
		
		if(R == true){
			transform.localScale.x = -size;
			gameObject.rigidbody2D.velocity = new Vector2 (-speedShell,0);
			anim.SetBool("Stand", false);
			anim.SetBool("Rod", true);
		}
		
		if(L == false && R == false){
			gameObject.rigidbody2D.velocity = new Vector2 (0,0);
			anim.SetBool("Stand", true);
			anim.SetBool("Rod", false);
		}
		RayCasting();
		Ber();	
	}
	
}

function RayCasting(){
	CollsionIs = Physics2D.Linecast(Col1.position, Col2.position);
	
	if(Physics2D.Linecast(Col1.position, Col2.position)){
		if(L == true){
			L = false;
			R = true;
		}
		else
		if(R == true){
			L = true;
			R = false;
		}
	}
}

function Ber (){
	
}