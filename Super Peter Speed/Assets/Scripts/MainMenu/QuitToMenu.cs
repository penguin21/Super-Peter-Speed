using UnityEngine;
using System.Collections;

public class QuitToMenu : MonoBehaviour{
	void OnClick(){
		Time.timeScale = 1.0F;
		Application.LoadLevel(0);
	}
}

