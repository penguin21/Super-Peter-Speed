var Loading = true;

function Update () {
	if(Loading == false){
		GetComponent(Animator).SetBool("save", true);
	}
	else{
		GetComponent(Animator).SetBool("save", false);
	}
}