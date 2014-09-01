var TalkText : GUIText;
var talkLines : String[];
var MessageObjectLabel : GameObject;

private var Talking : boolean = false;
private var CurrentLine : int;

function OnTriggerStay2D(other : Collider2D){
	if(other.gameObject.tag == "Player"){
		if(Input.GetButton("Interact")){
			MessageObjectLabel.SetActive(true);
			Talking = true;
			CurrentLine = 0;
			TalkText.text = talkLines[CurrentLine];
		}
	}
}

function Update(){
	if(Talking){
		if(Input.GetButton("Interact")){
		//Next Text
		if(CurrentLine < talkLines.Length - 1){
		CurrentLine++;
		TalkText.text = talkLines[CurrentLine];
		}
		else
		{
			CurrentLine = 0;
			TalkText.text = "";
			Talking = false;
			}
		}
	}
}