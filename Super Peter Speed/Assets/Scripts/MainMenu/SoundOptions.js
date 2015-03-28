var SoundLevel : UnityEngine.UI.Slider;
var MusicLevel : UnityEngine.UI.Slider;

function Start () {
	MusicLevel.value = PlayerPrefs.GetFloat("MusicVolume");
}

function Update () {
	PlayerPrefs.SetFloat("MusicVolume", MusicLevel.value);
}