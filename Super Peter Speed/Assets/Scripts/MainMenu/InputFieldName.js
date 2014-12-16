var PlayerName : String;
var inputField : UnityEngine.UI.InputField;
var nameDisplay : UnityEngine.UI.Text;
var Panel : GameObject;
var IsNamePanel : GameObject;
var Count : int = 0;

Count = PlayerPrefs.GetInt("IsNameNo");

function Start () {

}

function Update () {
	PlayerName = inputField.text;
	nameDisplay.text = PlayerName;
	if(Count == 1){
		Panel.SetActive(false);
	}
}

function NameAccept(){
	PlayerPrefs.SetString("PlayerName", PlayerName);
	PlayerPrefs.SetInt("IsNameNo", 1);
	Panel.SetActive(false);
}