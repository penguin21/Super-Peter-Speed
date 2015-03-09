var Shell : GameObject;
var IsL = false;
var IsR = false;
var IsUp = false;

function OnCollisionEnter2D(other : Collision2D){
	if(other.gameObject.tag == "Player"){
		if(IsL == true){
		Shell.GetComponent(ShellAI).R = false;
		Shell.GetComponent(ShellAI).L = true;
		Shell.GetComponent(ShellAI).IsRod = true;
		}
		if(IsR == true){
		Shell.GetComponent(ShellAI).R = true;
		Shell.GetComponent(ShellAI).L = false;
		Shell.GetComponent(ShellAI).IsRod = true;
		}
		
		if(IsUp == true){
		if(Shell.GetComponent(ShellAI).IsRod == true){
			Shell.GetComponent(ShellAI).IsRod = !Shell.GetComponent(ShellAI).IsRod;
			}
		}
	}
}