@script RequireComponent(AudioSource)

function Awake(){
	PlayerPrefs.GetFloat("SoundVolume");
}

function Update () {
	GetComponent.<AudioSource>().volume = PlayerPrefs.GetFloat("SoundVolume");
}