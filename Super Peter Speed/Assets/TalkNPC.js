﻿var TalkText : GUIText;
var talkLines : String[];
var MessageObjectLabel : GameObject;
var textScrollSpeed : int = 3;
var Arm : GameObject;
var Player : GameObject;
var AnimPlayer : Animator;

private var PlayerScript : Platformer2DUserControl;
var Talking : boolean = false;
private var textIsScrolling : boolean;
private var CurrentLine : int;

function Awake()  
{  
    //Get the Script C#  
   	PlayerScript = this.GetComponent("Platformer2DUserControl");
}  
   

function Start(){
	Arm = GameObject.FindWithTag ("Arm");
	Player = GameObject.FindWithTag ("Player");
	AnimPlayer = Player.GetComponent("Animator");
}

function OnTriggerStay2D(other : Collider2D){
	if(other.gameObject.tag == "Player"){
		if(Input.GetButtonDown("Interact")){
			MessageObjectLabel.SetActive(true);
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
			Talking = false;
			MessageObjectLabel.SetActive(false);
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
		TalkText.text = displayText;
		yield WaitForSeconds (1/ textScrollSpeed);
		}
	}
}