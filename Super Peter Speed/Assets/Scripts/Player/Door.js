var OpenSound : AudioClip;
var Level : String;
var GUIkey : GameObject; 

function OnTriggerEnter2D(other : Collider2D){
	if(other.gameObject.tag == "Player"){
			if(MainCode.Key >= 1){
				audio.PlayOneShot(OpenSound);
				GUIkey.SetActive(false);
				Application.LoadLevel(Application.loadedLevel);
		}
	}
}