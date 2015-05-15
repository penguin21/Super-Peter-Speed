var Frame : UI.Scrollbar;
var F : float;

function Update(){
	Frame.size = F;
	
	if(F > 1){
		F = 1;
	}
	
	if(F < 0){
		F = 0;
	}
}