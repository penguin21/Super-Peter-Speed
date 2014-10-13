var TalkText : GUIText;
var TalkTextA : GameObject;
var talkLines : String[];
var MessageObjectLabel : GameObject;
var textScrollSpeed : int = 3;
var Arm : GameObject;
var Player : GameObject;
var AnimPlayer : Animator;
var MessageGUI : Texture2D;
var MessageIs : boolean = false;
var Talking : boolean = false;

//Message Size
var KH : int = 111;
var KW : int = 682;
var TK : float = 3.54;
var Hs : int = -7;
var HL : int = 781;

private var PlayerScript : Platformer2DUserControl;
private var textIsScrolling : boolean;
private var CurrentLine : int;
private var Texting : String = "";


function Awake()  
{  
    //Get the Script C#  
   	PlayerScript = this.GetComponent("Platformer2DUserControl");
}  
   

function Start(){
	Arm = GameObject.FindWithTag ("Arm");
	Player = GameObject.FindWithTag ("Player");
	AnimPlayer = Player.GetComponent("Animator");
	TalkTextA.SetActive(false);
}

function OnTriggerStay2D(other : Collider2D){
	if(other.gameObject.tag == "Player"){
		if(Input.GetButtonDown("Interact")){
			MessageIs = true;
			TalkTextA.SetActive(true);
			Arm.SetActive(false);
			Talking = true;
			CurrentLine = 0;
			//TalkText.text = talkLines[CurrentLine];
			startScrolling();
			gameObject.GetComponent(BoxCollider2D).enabled = false;
			Player.GetComponent(Platformer2DUserControl).enabled = false;
			AnimPlayer.SetFloat("Speed", 0.0);
		}
	}
}

function Update(){
	if(Talking){
		Player.GetComponent(Platformer2DUserControl).enabled = false;
		if(Input.GetButtonDown("Interact")){
		if(textIsScrolling){
			Texting = talkLines[CurrentLine];
			textIsScrolling = false;
		}
		else{
		//Next Text
		if(CurrentLine < talkLines.Length - 1){
		CurrentLine++;
		Texting = talkLines[CurrentLine];
		startScrolling();
		}
		else
		{
			CurrentLine = 0;
			Texting = "";
			Talking = false;
			MessageIs = false;
			TalkTextA.SetActive(false);
			gameObject.GetComponent(BoxCollider2D).enabled = true;
			Arm.SetActive(true);
			Player.GetComponent(Platformer2DUserControl).enabled = true;
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
		Texting = displayText;
		yield WaitForSeconds (1/ textScrollSpeed);
		}
	}
}

function OnGUI(){
	if(MessageIs){
 		if(!MessageGUI){
			Debug.LogError("What!!!!! Error.Please assing Texture.");
			return;
		}
		GUI.DrawTexture(Rect(Hs,KH,KW,HL), MessageGUI, ScaleMode.ScaleToFit, true, TK);
		GUI.Label (Rect (30, 450, 600, 2000), Texting);
 }
}