using UnityEngine;
using System.Collections;

public class MainMenuChangePanel : MonoBehaviour {

	public GameObject NewPanel;
	public GameObject OldPanel;

	void OnClick(){
		OldPanel.SetActive(false);
		NewPanel.SetActive(true);
	}
}
