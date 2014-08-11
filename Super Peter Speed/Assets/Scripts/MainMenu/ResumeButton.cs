using UnityEngine;
using System.Collections;

public class ResumeButton : MonoBehaviour {
	public GameObject Pause;
	void OnClick(){
		Pause.SetActive(false);
		Time.timeScale = 1.0F;
	}	
}
