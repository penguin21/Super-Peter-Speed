using UnityEngine;
using System.Collections;
using Lean;

public class LeanManager : MonoBehaviour {

	public int LangID = 0;

	// Use this for initialization
	void Start () {
		LangID = PlayerPrefs.GetInt("Language");
	}
	
	// Update is called once per frame
	void Update () {

	}
}