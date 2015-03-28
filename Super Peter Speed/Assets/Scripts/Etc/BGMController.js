@script RequireComponent(AudioSource)


function Awake(){
	PlayerPrefs.GetFloat("MusicVolume");
}

function Update () {
	GetComponent.<AudioSource>().volume = PlayerPrefs.GetFloat("MusicVolume");
}