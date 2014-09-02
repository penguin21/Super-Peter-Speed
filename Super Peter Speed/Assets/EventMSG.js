var TalkText : GUIText;
var talkLines : String[];
var MessageObjectLabel : GameObject;
var textScrollSpeed : int = 3;
var Arm : GameObject;
var Player : GameObject;
var EventBox : GameObject;
var AnimPlayer : Animator;

private var PlayerScript : Platformer2DUserControl;
private var EventMSG : boolean = false;
private var textIsScrolling : boolean;
private var CurrentLine : int;

function Awake()  
{  
    //Get the Script C#  
   	PlayerScript = this.GetComponent("Platformer2DUserControl");
}  
   

function Start(){
	var anim = Player.GetComponent(Animator);
	
	Arm = GameObject.FindWithTag ("Arm");
	Player = GameObject.FindWithTag ("Player");
	AnimPlayer = Player.GetComponent("Animator");
}

function OnTriggerStay2D(other : Collider2D){
	if(other.gameObject.tag == "Player"){
			MessageObjectLabel.SetActive(true);
			Arm.SetActive(false);
			EventMSG = true;
			CurrentLine = 0;
			//TalkText.text = talkLines[CurrentLine];
			startScrolling();
			EventBox.GetComponent(BoxCollider2D).enabled = false;
			Player.GetComponent(Platformer2DUserControl).enabled = false;
			AnimPlayer.SetFloat("Speed", 0.0);
	}
}

function Update(){
	if(EventMSG == true){
		if(Input.GetButtonDown("Interact")){
		if(textIsScrolling){
			TalkText.text = talkLines[CurrentLine];
			textIsScrolling = false;
		}
		else{
		//Next Text
		if(CurrentLine < talkLines.Length - 1){
		CurrentLine++;
		TalkText.text = talkLines[CurrentLine];
		startScrolling();
		}
		else
		{
			CurrentLine = 0;
			TalkText.text = "";
			EventMSG = false;
			Player.GetComponent(Platformer2DUserControl).enabled = true;
			MessageObjectLabel.SetActive(false);
			Arm.SetActive(true);
			}
		}
	}
	}
}

function startScrolling(){
	textIsScrolling = true;
	var startLine : int = CurrentLine;
	var displayText : String = "";
	
	for(var i : int = 0; i < talkLines[CurrentLine].Length; i++){
		if(textIsScrolling && CurrentLine == startLine){
		displayText += talkLines[CurrentLine][i];
		TalkText.text = displayText;
		yield WaitForSeconds (1/ textScrollSpeed);
		}
	}
}