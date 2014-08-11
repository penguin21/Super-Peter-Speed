var PauseCore : GameObject;

function Start () {

}

function Update () {
	if(Input.GetKeyDown("escape")){
		Time.timeScale = 0.0;
		PauseCore.SetActive(true);
	}
}