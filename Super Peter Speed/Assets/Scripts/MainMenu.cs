using UnityEngine;
using System.Collections;
using Prime31.TransitionKit;

public class MainMenu : MonoBehaviour {

	public GameObject Cam;
	public bool isEffectNew = false;
	private GameObject GameObjectUsed;
	private string SceneA;

	void Start(){


	}

	public void EnterToScene(string sceneChangeTo){
		Debug.Log("Enter to scene");
		Cam.GetComponent<FadeIn>().enabled = true;
		SceneA = sceneChangeTo;	
		StartCoroutine(ChangeSceneFade());
	}

	public void Quit(){
		Debug.Log("Good bye");
		Cam.GetComponent<FadeIn>().enabled = true;
		StartCoroutine(QuitFade());
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
	IEnumerator QuitFade() {
		yield return new WaitForSeconds(1.5f);
		Application.Quit();
	}
	IEnumerator ChangeSceneFade() {
		yield return new WaitForSeconds(1.5f);
		Application.LoadLevel(SceneA);
	}

}