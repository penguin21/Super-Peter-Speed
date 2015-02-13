var PlayerName : String;
var inputField : UnityEngine.UI.InputField;
var Panel : GameObject;
var IsNamePanel : GameObject;
var Count : int = 0;

Count = PlayerPrefs.GetInt("IsNameNo");

function Start () {

}

function Update () {
	PlayerName = inputField.text;
}

function NameAccept(){
	if(PlayerName == ""){
		Debug.Log("Enter your name");
	}else{
	PlayerPrefs.SetString("PlayerName", PlayerName);
	PlayerPrefs.SetInt("IsNameNo", 1);
	Debug.Log("Name change to " + PlayerName);
	PlayerName = "";
	inputField.text = "";
	}
}