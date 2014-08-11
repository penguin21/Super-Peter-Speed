using UnityEngine;
using System.Collections;

public class RestartButton : MonoBehaviour {

	void OnClick(){
		Application.LoadLevel(Application.loadedLevel);
		Time.timeScale = 1.0F;
	}	
}
