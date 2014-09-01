var LockObj1 : GameObject;
var LockObj2 : GameObject;
var LockObj3 : GameObject;
var LockObj4 : GameObject;

var Intruduction : GameObject;
var Chapter1 : GameObject;
var Chapter2 : GameObject;
var Chapter3 : GameObject;

var IntruductionC : GameObject;
var Chapter1C : GameObject;
var Chapter2C : GameObject;
var Chapter3C : GameObject;

//Level to Start
var TutorialReach : int;
var IntruductionReached : int;
var Chapter1Reached : int;
var Chapter2Reached : int;
var Chapter3Reached : int;

//Level Settings
TutorialReach = PlayerPrefs.GetInt("TutorialComplete");
IntruductionReached = PlayerPrefs.GetInt("IntroductionComplete");
Chapter1Reached = PlayerPrefs.GetInt("Chapter1Complete");
Chapter2Reached = PlayerPrefs.GetInt("Chapter2Complete");
Chapter3Reached = PlayerPrefs.GetInt("Chapter3Complete");

function Update () {
	
	if(TutorialReach == 1){
		LockObj1.SetActive(false);
		IntruductionC.SetActive(true);
	}
	else
	if(TutorialReach == 0){
		LockObj1.SetActive(true);
		IntruductionC.SetActive(false);
	}
}