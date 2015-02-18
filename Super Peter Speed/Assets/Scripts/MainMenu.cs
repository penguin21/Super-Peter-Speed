using UnityEngine;
using System.Collections;

public class MainMenu : MonoBehaviour {
	
	private GameObject GameObjectUsed;

	public void EnterToScene(string sceneChangeTo){
		Debug.Log("Enter to scene");
		Application.LoadLevel(sceneChangeTo);
	}

	public void Quit(){
		Debug.Log("Good bye");
		Application.Quit();
	}

	public void ChangePanelOld(GameObject PanelOld){
		PanelOld.SetActive(false);
	}

	public void ChangePanelNew(GameObject PanelNew){
		PanelNew.SetActive(true);
	}

	public void GetGameObject(GameObject Obj){
		Obj = GameObjectUsed;
	}

	public void DisabledComponentWorld(GameObject W){
		W.GetComponent<MoveWorld>().enabled = false;
	}

	public void EnabledComponentWorld(GameObject W){
		W.GetComponent<MoveWorld>().enabled = true;
	}
	
}