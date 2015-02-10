var Col1 : Transform;
var Col2 : Transform;
var CollsionIs = false;

function Start () {

}

function Update () {
	RayCasting();
	Ber();
}

function RayCasting(){
	CollsionIs = Physics2D.Linecast(Col1.position, Col2.position);
}

function Ber (){
	
}