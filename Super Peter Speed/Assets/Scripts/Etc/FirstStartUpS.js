var IsF = 0;

IsF = PlayerPrefs.GetInt("StartBootF");

function Start () {

}

function Update () {
	if(IsF == 0){
		PlayerPrefs.SetFloat("SoundVolume", 1);
		PlayerPrefs.SetFloat("MusicVolume", 0.5);
		PlayerPrefs.SetInt("StartBootF", 1);
	}
}