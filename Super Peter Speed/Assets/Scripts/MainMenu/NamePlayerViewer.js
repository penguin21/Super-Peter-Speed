var Text : UnityEngine.UI.Text;

function Start () {

}

function Update () {
	Text.text = PlayerPrefs.GetString("PlayerName");
}