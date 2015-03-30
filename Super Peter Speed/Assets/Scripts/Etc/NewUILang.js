var Text : UnityEngine.UI.Text;
var systemLanguageSpa: SystemLanguage;
var TextEng : String;
var systemLanguageEng: SystemLanguage;
var TextSpa : String;

function Start () {

}

function Update () {
	if(Application.systemLanguageSpa){
		Text.text = TextSpa;
	}

	if(Application.systemLanguageEng){
		Text.text = TextEng;
	}
}