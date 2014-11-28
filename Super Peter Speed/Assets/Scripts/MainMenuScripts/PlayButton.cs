using UnityEngine;
using System.Collections;

public class PlayButton : MonoBehaviour {

	public void EnterToScene(string sceneChangeTo){
		Application.LoadLevel(sceneChangeTo);
	}	
}
