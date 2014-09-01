var Rigth : boolean = false;
var Left : boolean = true;

function Start () {
	Left = true;
	Rigth = false;
}

function Update () {
	if(Input.GetAxis("Move") < 0){
		Left = true;
		Rigth = false;
		}
	
	if(Input.GetAxis("Move") > 0){
		Left = false;
		Rigth = true;
	}
	
	if(Left == true){
		if(GameObject.FindGameObjectsWithTag("Gun")){
			if(gameObject.GetComponent(Shot)){
				facingL = true;
			}
		}
	}
	
	if(Rigth == true){
		if(GameObject.FindGameObjectsWithTag("Gun")){
			if(gameObject.GetComponent(Shot)){
				facingR = true;
			}
		}
	}
}