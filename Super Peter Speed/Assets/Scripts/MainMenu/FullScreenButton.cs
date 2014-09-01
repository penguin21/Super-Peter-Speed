using UnityEngine;
using System.Collections;

public class FullScreenButton : MonoBehaviour
{

	void OnClick(){
		//if fullscreen to window
		if(Screen.fullScreen == true) 
		{
			Screen.fullScreen = false;
			return;
		}
		Debug.Log("Fullscreen is ON");
		
		//If window mode change it to fullscreen
		if(Screen.fullScreen == false) 
		{
			Screen.fullScreen = true;
			return;
		}
		Debug.Log("Fullscreen is OFF");
	}
}

