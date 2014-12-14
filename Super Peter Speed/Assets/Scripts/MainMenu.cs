﻿using UnityEngine;
using System.Collections;

public class MainMenu : MonoBehaviour {

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
}