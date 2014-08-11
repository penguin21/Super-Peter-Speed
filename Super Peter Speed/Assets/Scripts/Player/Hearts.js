var heartImage : GUITexture;
var i1 : Texture2D;
var i2 : Texture2D;
var i3 : Texture2D;
var i4 : Texture2D;
var i5 : Texture2D;
var i6 : Texture2D;

function Update () {
	if(MainCode.Heart == 5){
	heartImage.texture = i1;
	}
	
	if(MainCode.Heart == 4){
	heartImage.texture = i2;
	}
	
	if(MainCode.Heart == 3){
	heartImage.texture = i3;
	}
	
	if(MainCode.Heart == 2){
	heartImage.texture = i4;
	}
	
	if(MainCode.Heart == 1){
	heartImage.texture = i5;
	}
	
	if(MainCode.Heart == 0){
	heartImage.texture = i6;
	}
}